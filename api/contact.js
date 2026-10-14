// Recebe os pedidos dos formulários do site e encaminha-os:
//   1. para o GHL (GHL_WEBHOOK_URL), como sempre;
//   2. por e-mail para a empresa, via Resend.
//
// Env vars do e-mail:
//   RESEND_API_KEY     chave do Resend (sem ela não é enviado e-mail)
//   LEAD_FROM_EMAIL    remetente, ex.: leads@growth-lab-agency.com
//   LEAD_COMPANY_NAME  nome da empresa (remetente + corpo do e-mail)
//   LEAD_TO_EMAIL      e-mail da empresa. Vazio = pré-ativação: só a agência recebe.
//   LEAD_BCC_EMAIL     cópia oculta para a agência
//   LEAD_TEST_TOKEN    pedidos com o header `x-lead-test` igual a este valor são testes:
//                      não vão para o GHL e o e-mail só vai para a agência.

const MAX = { name: 200, phone: 50, email: 200, message: 5000, page: 500 };

const clean = (v, max) => String(v ?? '').trim().slice(0, max);
const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function waNumber(phone) {
  let digits = phone.replace(/\D/g, '');
  if (digits.startsWith('00')) digits = digits.slice(2);
  if (digits.length === 9) digits = '351' + digits;
  return digits;
}

async function sendToGHL(webhookUrl, lead) {
  const r = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      full_name: lead.name,
      phone:     lead.phone,
      message:   lead.message,
      email:     lead.email,
    }),
    signal: AbortSignal.timeout(8000),
  });
  if (!r.ok) throw new Error(`GHL respondeu ${r.status}`);
}

function renderEmail(lead, company, receivedAt) {
  const row = (label, value) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #eee;color:#666;width:110px;vertical-align:top;">${label}</td>
      <td style="padding:10px 0;border-bottom:1px solid #eee;color:#111;">${value}</td>
    </tr>`;

  const phone = escapeHtml(lead.phone);
  const email = escapeHtml(lead.email);
  const rows = [
    lead.name && row('Nome', `<strong>${escapeHtml(lead.name)}</strong>`),
    lead.phone && row('Telefone', `<a href="tel:${phone.replace(/\s/g, '')}" style="color:#111;">${phone}</a>`),
    lead.email && row('E-mail', `<a href="mailto:${email}" style="color:#111;">${email}</a>`),
    lead.message && row('Mensagem', `<span style="white-space:pre-wrap;">${escapeHtml(lead.message)}</span>`),
    lead.page && row('Página', `<span style="color:#666;font-size:13px;">${escapeHtml(lead.page)}</span>`),
  ].filter(Boolean).join('');

  const btn = (href, label, bg) =>
    `<a href="${href}" style="display:inline-block;padding:12px 20px;margin:0 8px 8px 0;border-radius:6px;background:${bg};color:#fff;font-weight:600;text-decoration:none;">${label}</a>`;
  const buttons = lead.phone
    ? btn(`tel:${phone.replace(/\s/g, '')}`, 'Ligar', '#111') + btn(`https://wa.me/${waNumber(lead.phone)}`, 'WhatsApp', '#25D366')
    : '';

  const html = `<!doctype html>
<html><body style="margin:0;padding:24px;background:#f4f4f5;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#fff;border-radius:10px;">
    <tr><td style="padding:28px 28px 8px;">
      <div style="font-size:20px;font-weight:700;color:#111;">Novo pedido de contacto</div>
      <div style="color:#666;margin-top:4px;">Recebido pelo website ${escapeHtml(company)} · ${receivedAt}</div>
    </td></tr>
    <tr><td style="padding:8px 28px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>
    </td></tr>
    <tr><td style="padding:20px 28px 8px;">${buttons}</td></tr>
    <tr><td style="padding:8px 28px 28px;color:#999;font-size:12px;">
      ${lead.email ? 'Pode responder diretamente a este e-mail para escrever ao cliente. ' : ''}Mensagem enviada automaticamente pelo formulário do website.
    </td></tr>
  </table>
</body></html>`;

  const text = [
    `Novo pedido de contacto — website ${company} (${receivedAt})`,
    '',
    lead.name && `Nome: ${lead.name}`,
    lead.phone && `Telefone: ${lead.phone}`,
    lead.email && `E-mail: ${lead.email}`,
    lead.message && `Mensagem:\n${lead.message}`,
    lead.page && `Página: ${lead.page}`,
  ].filter(Boolean).join('\n');

  return { html, text };
}

async function sendEmail(lead, test) {
  const company = process.env.LEAD_COMPANY_NAME || 'Website';
  const bcc = process.env.LEAD_BCC_EMAIL || '';
  const client = test ? '' : process.env.LEAD_TO_EMAIL || '';
  const to = client || bcc;
  if (!to) throw new Error('sem destinatário (LEAD_TO_EMAIL / LEAD_BCC_EMAIL)');

  const tag = test ? '[TESTE] ' : client ? '' : '[PRÉ-ATIVAÇÃO] ';
  const receivedAt = new Date().toLocaleString('pt-PT', {
    timeZone: 'Europe/Lisbon', dateStyle: 'short', timeStyle: 'short',
  });
  const { html, text } = renderEmail(lead, company, receivedAt);

  const payload = {
    from: `"${company.replace(/"/g, '')}" <${process.env.LEAD_FROM_EMAIL}>`,
    to: [to],
    subject: `${tag}Novo pedido de contacto: ${lead.name || lead.phone || lead.email}`,
    html,
    text,
  };
  if (client && bcc) payload.bcc = [bcc];
  if (isEmail(lead.email)) payload.reply_to = lead.email;

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(8000),
  });
  if (!r.ok) throw new Error(`Resend respondeu ${r.status}: ${await r.text()}`);
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const body = req.body || {};
  const lead = {
    name:    clean(body.name, MAX.name),
    phone:   clean(body.phone, MAX.phone),
    email:   clean(body.email, MAX.email),
    message: clean(body.message, MAX.message),
    page:    clean(req.headers.referer, MAX.page),
  };

  const testToken = process.env.LEAD_TEST_TOKEN;
  const test = Boolean(testToken) && req.headers['x-lead-test'] === testToken;
  const webhookUrl = process.env.GHL_WEBHOOK_URL;
  const emailOn = Boolean(process.env.RESEND_API_KEY && process.env.LEAD_FROM_EMAIL);

  if (!webhookUrl && !emailOn) return res.status(500).json({ error: 'Lead destination not configured' });

  const jobs = [];
  if (webhookUrl && !test) jobs.push(['GHL', sendToGHL(webhookUrl, lead)]);
  if (emailOn && (lead.phone || lead.email)) jobs.push(['e-mail', sendEmail(lead, test)]);

  const results = await Promise.allSettled(jobs.map(([, job]) => job));
  results.forEach((r, i) => {
    if (r.status === 'rejected') console.error(`[lead] Falha no envio para ${jobs[i][0]}:`, r.reason?.message || r.reason);
  });

  if (test) {
    return res.status(200).json({
      ok: true,
      test: true,
      results: jobs.map(([target], i) => ({ target, status: results[i].status, error: results[i].reason?.message })),
    });
  }
  res.status(200).json({ ok: true });
}
