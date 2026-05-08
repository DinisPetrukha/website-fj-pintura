export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { name, phone, message, email } = req.body || {};
  const webhookUrl = process.env.GHL_WEBHOOK_URL;

  if (!webhookUrl) return res.status(500).json({ error: 'Webhook not configured' });

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        full_name: name || '',
        phone:     phone || '',
        message:   message || '',
        email:     email || '',
      }),
    });
  } catch (_) {}

  res.status(200).json({ ok: true });
}
