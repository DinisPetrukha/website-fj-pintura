/* ================================================
   SHARED COMPONENTS — Header / Footer / Modal
   FJ Pintura e Pladur
   ================================================ */

/* ─── CLIENT CONFIG ─── */
const COMPANY_NAME    = 'FJ Pintura e Pladur';
const COMPANY_LEGAL   = 'FJ Pintura e Pladur';
const PHONE           = '932 995 746';
const PHONE_RAW       = '932995746';
const EMAIL           = 'fj.072704@gmail.com';
const ADDRESS         = 'Alexandre Herculano 51, 4780-389 Santo Tirso';
const WA_LINK         = 'https://wa.me/351932995746';
const FACEBOOK_URL    = 'https://www.facebook.com/share/1CWDQQ3gB7/';
const INSTAGRAM_URL   = 'https://www.instagram.com/fj_pintura_e_pladur?igsh=MzhkMnR5cnJmYjBt';
const YEARS_EXP       = '15';
const TAGLINE         = 'Pintura mecanizada Airless, pintura interna/externa e pladur no Porto e arredores.';
const CERTIFICATIONS  = ['15 Anos de Experiência', 'Pintura Mecanizada Airless', 'Pladur Profissional'];
const BRANDS          = 'Pintura Airless · Pladur · Construção e Remodelação';
/* ─────────────────────────────────────────────────────────── */

/* ─── NAVIGATION ─── */
const SERVICES = [
  { label: 'Pintura Mecanizada Airless', href: 'Pintura-Mecanizada-Airless.html' },
  { label: 'Pintura Interna e Externa',  href: 'Pintura-Interna-e-Externa.html' },
  { label: 'Pladur',                     href: 'Pladur.html' },
];

const AREAS = [
  { label: 'Porto',             href: 'Porto.html' },
  { label: 'Santo Tirso',       href: 'Santo-Tirso.html' },
  { label: 'Maia',              href: 'Maia.html' },
  { label: 'Vila Nova de Gaia', href: 'Vila-Nova-de-Gaia.html' },
  { label: 'Braga',             href: 'Braga.html' },
];
/* ─────────────────────────────────────────────────────────── */

function chevron() {
  return `<svg viewBox="0 0 24 24" style="width:14px;height:14px;fill:currentColor"><path d="M7 10l5 5 5-5z"/></svg>`;
}
function arrowRight() {
  return `<svg viewBox="0 0 24 24" style="width:12px;height:12px;fill:currentColor"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>`;
}
function phoneSVG() {
  return `<svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>`;
}

function logoIMG(height) {
  return `<img src="imgs/logo.png" alt="${COMPANY_NAME}" style="height:${height || 52}px;width:auto;display:block;">`;
}

function buildDropdown(items) {
  return `
  <div class="dropdown">
    <div class="dropdown-grid">
      ${items.map(i => `<a href="${i.href}">${i.label}</a>`).join('')}
    </div>
  </div>`;
}

const HEADER = `
<header id="site-header">
  <div class="container">
    <div class="header-inner">
      <a href="index.html" class="logo">
        ${logoIMG(52)}
      </a>
      <nav class="main-nav">
        <a href="index.html" class="nav-link" data-page="home">Início</a>
        <div class="nav-item">
          <a class="nav-link" data-page="services" href="#">Serviços ${chevron()}</a>
          ${buildDropdown(SERVICES)}
        </div>
        <a href="projects.html" class="nav-link" data-page="projects">Projetos</a>
        <div class="nav-item">
          <a class="nav-link" data-page="areas" href="#">Áreas de Serviço ${chevron()}</a>
          ${buildDropdown(AREAS)}
        </div>
        <a href="blog.html" class="nav-link" data-page="blog">Blog</a>
        <a href="contact.html" class="nav-link" data-page="contact">Contacto</a>
      </nav>
      <div class="header-right">
        <a href="tel:${PHONE_RAW}" class="header-phone">
          ${phoneSVG()}
          ${PHONE}
        </a>
        <button class="btn btn-green open-modal">Orçamento Grátis</button>
        <button class="hamburger" id="hamburger" aria-label="Abrir menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </div>
</header>
<div class="mobile-nav" id="mobile-nav">
  <a href="index.html" class="mobile-nav-link">Início</a>
  <div>
    <div class="mobile-dropdown-title" data-target="mob-svc">Serviços ${chevron()}</div>
    <div class="mobile-dropdown-items" id="mob-svc">${SERVICES.map(s => `<a href="${s.href}">${s.label}</a>`).join('')}</div>
  </div>
  <a href="projects.html" class="mobile-nav-link">Projetos</a>
  <div>
    <div class="mobile-dropdown-title" data-target="mob-areas">Áreas de Serviço ${chevron()}</div>
    <div class="mobile-dropdown-items" id="mob-areas">${AREAS.map(a => `<a href="${a.href}">${a.label}</a>`).join('')}</div>
  </div>
  <a href="blog.html" class="mobile-nav-link">Blog</a>
  <a href="contact.html" class="mobile-nav-link">Contacto</a>
  <div class="mobile-cta">
    <a href="tel:${PHONE_RAW}" class="btn btn-outline-white">Ligar ${PHONE}</a>
    <button class="btn btn-green open-modal">Orçamento Grátis</button>
  </div>
</div>`;

const PROCESS_HTML = `
<section class="process-section">
  <div class="container">
    <div class="section-header" style="margin-bottom:48px;">
      <div class="section-label" style="background:rgba(0,0,255,0.15);color:#0000ff;border:1px solid rgba(0,0,255,0.3);">Como Funcionamos</div>
      <h2 style="color:#fff;">O Nosso Processo</h2>
      <p style="color:rgba(255,255,255,0.6);">Do primeiro contacto à entrega final — rápido, limpo e com acabamento impecável.</p>
    </div>
    <div class="process-steps">
      <div class="process-step">
        <div class="process-icon">
          <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
        </div>
        <div class="process-num">Passo 01</div>
        <h4>Orçamento Grátis</h4>
        <p>Contacte-nos e deslocamo-nos ao local para avaliação gratuita. Proposta em 24h.</p>
      </div>
      <div class="process-step">
        <div class="process-icon">
          <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
        </div>
        <div class="process-num">Passo 02</div>
        <h4>Avaliação Técnica</h4>
        <p>Avaliamos as superfícies e definimos a melhor solução para o seu projeto.</p>
      </div>
      <div class="process-step active-step">
        <div class="process-icon">
          <svg viewBox="0 0 24 24"><path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/></svg>
        </div>
        <div class="process-num">Passo 03</div>
        <h4>Preparação</h4>
        <p>Limpeza, lixamento e aplicação de primário para garantir aderência e acabamento perfeito.</p>
      </div>
      <div class="process-step">
        <div class="process-icon">
          <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
        </div>
        <div class="process-num">Passo 04</div>
        <h4>Execução Profissional</h4>
        <p>Pintura Airless ou manual e trabalhos de pladur com máxima precisão e rapidez.</p>
      </div>
      <div class="process-step">
        <div class="process-icon">
          <svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4l5 2.18V11c0 3.54-2.43 6.86-5 7.93-2.57-1.07-5-4.39-5-7.93V7.18L12 5z"/></svg>
        </div>
        <div class="process-num">Passo 05</div>
        <h4>Entrega &amp; Garantia</h4>
        <p>Limpeza final, revisão do trabalho consigo e entrega com acompanhamento total.</p>
      </div>
    </div>
  </div>
</section>`;

const AREAS_SECTION_HTML = `
<section class="section section-light">
  <div class="container">
    <div class="section-header">
      <div class="section-label">Cobertura</div>
      <h2>Áreas que Servimos</h2>
      <p>${TAGLINE}</p>
    </div>
    <div class="areas-grid">
      ${AREAS.map(a => `
      <a href="${a.href}" class="area-item">
        <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
        ${a.label}
      </a>`).join('')}
    </div>
  </div>
</section>`;

const REVIEWS_SECTION_HTML = `
<section class="reviews-section">
  <img class="reviews-bg" src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&h=600&fit=crop&q=80" alt="" aria-hidden="true" loading="lazy">
  <div class="reviews-overlay"></div>
  <div class="reviews-content container">
    <div class="section-header">
      <div class="section-label label-white">Testemunhos</div>
      <h2 style="color:#fff;">O Que os Nossos Clientes Dizem</h2>
    </div>
    <div class="reviews-grid">
      <div class="review-card">
        <div class="review-stars"><span class="star">★</span><span class="star">★</span><span class="star">★</span><span class="star">★</span><span class="star">★</span></div>
        <p class="review-text">"Excelente trabalho! A pintura ficou impecável, com um acabamento muito profissional e sem sujidade."</p>
        <div class="reviewer">
          <div class="reviewer-avatar">JS</div>
          <div><div class="reviewer-name">João Silva</div><div class="reviewer-loc">Porto · 2022</div></div>
        </div>
      </div>
      <div class="review-card">
        <div class="review-stars"><span class="star">★</span><span class="star">★</span><span class="star">★</span><span class="star">★</span><span class="star">★</span></div>
        <p class="review-text">"Fizeram o teto falso em pladur cá em casa e ficou perfeito. Muito rigor e atenção ao detalhe."</p>
        <div class="reviewer">
          <div class="reviewer-avatar">AF</div>
          <div><div class="reviewer-name">Ana Ferreira</div><div class="reviewer-loc">Santo Tirso · 2022</div></div>
        </div>
      </div>
      <div class="review-card">
        <div class="review-stars"><span class="star">★</span><span class="star">★</span><span class="star">★</span><span class="star">★</span><span class="star">★</span></div>
        <p class="review-text">"Destaco a rapidez na resposta e na execução. Cumpriram prazos e o resultado final foi excelente."</p>
        <div class="reviewer">
          <div class="reviewer-avatar">RS</div>
          <div><div class="reviewer-name">Ricardo Santos</div><div class="reviewer-loc">Porto · 2023</div></div>
        </div>
      </div>
    </div>
  </div>
</section>`;

const CTA_SECTION_HTML = `
<section class="cta-section">
  <img class="cta-bg" src="https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=1600&h=600&fit=crop&q=80" alt="" aria-hidden="true" loading="lazy">
  <div class="cta-overlay"></div>
  <div class="cta-content container">
    <div class="section-label label-white">Pronto para Começar?</div>
    <h2>Peça um Orçamento Grátis Hoje!</h2>
    <p>Visita gratuita, proposta em 24h e resposta imediata — o seu projeto não pode ficar parado.</p>
    <div class="cta-btns">
      <button class="btn btn-green btn-lg open-modal">Orçamento Grátis</button>
      <a href="tel:${PHONE_RAW}" class="btn btn-outline-white btn-lg">${PHONE}</a>
    </div>
  </div>
</section>`;

const FOOTER_HTML = `
<footer id="site-footer">
  <div class="container">
    <div class="footer-top">
      <div class="footer-grid">
        <div>
          <div class="footer-logo-wrap">
            <img src="imgs/logo.png" alt="${COMPANY_NAME}" style="height:56px;width:auto;margin-bottom:12px;display:block;">
          </div>
          <p class="footer-tagline">${TAGLINE} ${YEARS_EXP} anos de experiência.</p>
          <div class="footer-contact">
            <div class="footer-contact-item">
              <svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
              <a href="tel:${PHONE_RAW}">${PHONE}</a>
            </div>
            <div class="footer-contact-item">
              <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              <a href="mailto:${EMAIL}">${EMAIL}</a>
            </div>
            <div class="footer-contact-item">
              <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              ${ADDRESS}
            </div>
          </div>
          <div class="footer-social">
            <a href="${FACEBOOK_URL}" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg></a>
            <a href="${INSTAGRAM_URL}" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg viewBox="0 0 24 24"><path d="M16 2H8a6 6 0 00-6 6v8a6 6 0 006 6h8a6 6 0 006-6V8a6 6 0 00-6-6zm4 14a4 4 0 01-4 4H8a4 4 0 01-4-4V8a4 4 0 014-4h8a4 4 0 014 4v8zm-8-10a4 4 0 100 8 4 4 0 000-8zm0 6a2 2 0 110-4 2 2 0 010 4zm4-7a1 1 0 100 2 1 1 0 000-2z"/></svg></a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Serviços</h4>
          <ul>${SERVICES.map(s => `<li><a href="${s.href}">${s.label}</a></li>`).join('')}</ul>
          <h4 style="margin-top:24px;">Especialidades</h4>
          <ul>${CERTIFICATIONS.map(c => `<li><span style="color:rgba(255,255,255,0.55);font-size:0.85rem;">${c}</span></li>`).join('')}</ul>
        </div>
        <div class="footer-col">
          <h4>Áreas</h4>
          <ul>${AREAS.map(a => `<li><a href="${a.href}">${a.label}</a></li>`).join('')}</ul>
        </div>
        <div class="footer-col">
          <h4>Links Rápidos</h4>
          <ul>
            <li><a href="index.html">Início</a></li>
            <li><a href="projects.html">Os Nossos Projetos</a></li>
            <li><a href="about.html">Sobre Nós</a></li>
            <li><a href="blog.html">Blog</a></li>
            <li><a href="contact.html">Contacto</a></li>
            <li><a href="contact.html">Orçamento Grátis</a></li>
            <li><a href="terms.html">Termos &amp; Condições</a></li>
            <li><a href="privacy-policy.html">Política de Privacidade</a></li>
          </ul>
          <h4 style="margin-top:24px;">Técnicas</h4>
          <ul>
            <li><span style="color:rgba(255,255,255,0.55);font-size:0.85rem;">${BRANDS}</span></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span class="footer-copy">&copy; ${new Date().getFullYear()} ${COMPANY_LEGAL}. Todos os direitos reservados.</span>
      <div class="footer-legal">
        <a href="terms.html">Termos &amp; Condições</a>
        <a href="privacy-policy.html">Política de Privacidade</a>
      </div>
    </div>
  </div>
</footer>`;

const MODAL_HTML = `
<div class="modal-overlay" id="modal-overlay" role="dialog" aria-modal="true" aria-label="Pedir orçamento grátis">
  <div class="modal">
    <button class="modal-close" id="modal-close" aria-label="Fechar">&times;</button>
    <div class="modal-logo">
      <div style="text-align:center;">
        <img src="imgs/logo.png" alt="${COMPANY_NAME}" style="height:56px;width:auto;margin:0 auto 8px;">
      </div>
    </div>
    <h2>PEÇA UM ORÇAMENTO GRÁTIS</h2>
    <form id="quote-form" novalidate>
      <div class="form-group">
        <label for="m-name">Nome Completo <span class="req">*</span></label>
        <input type="text" id="m-name" name="name" placeholder="João Silva" required>
      </div>
      <div class="form-group">
        <label for="m-phone">Telemóvel <span class="req">*</span></label>
        <input type="tel" id="m-phone" name="phone" placeholder="${PHONE}" required>
      </div>
      <div class="form-group">
        <label for="m-msg">O que precisa? <span class="req">*</span></label>
        <textarea id="m-msg" name="message" placeholder="Ex: pintura de sala e quartos, teto falso em pladur, pintura exterior..." required></textarea>
      </div>
      <div class="form-group">
        <div class="form-check">
          <input type="checkbox" id="m-terms" name="terms" required>
          <label for="m-terms">Concordo com os <a href="terms.html" target="_blank">termos &amp; condições</a>. Ao fornecer o meu número, aceito receber mensagens da empresa.</label>
        </div>
      </div>
      <button type="submit" class="btn btn-green btn-lg btn-send">ENVIAR PEDIDO</button>
    </form>
    <div class="form-success" id="quote-success">
      <h3>&#10003; Obrigado!</h3>
      <p>Recebemos o seu pedido e entraremos em contacto dentro de 24 horas.</p>
    </div>
  </div>
</div>`;

function loadPhoneFlags() {
  if (document.querySelector('link[href*="intlTelInput"]')) return;
  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = 'https://cdn.jsdelivr.net/npm/intl-tel-input@23/build/css/intlTelInput.css';
  document.head.appendChild(css);

  const js = document.createElement('script');
  js.src = 'https://cdn.jsdelivr.net/npm/intl-tel-input@23/build/js/intlTelInput.min.js';
  js.onload = () => {
    const pf = document.createElement('script');
    pf.src = 'js/phone-flags.js';
    document.body.appendChild(pf);
  };
  document.body.appendChild(js);
}

const WA_BUTTON_HTML = `
<a class="wa-float" href="${WA_LINK}" target="_blank" rel="noopener noreferrer" aria-label="Contactar via WhatsApp">
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
</a>`;

function injectComponents(activePage) {
  const hp = document.getElementById('header-placeholder');
  const fp = document.getElementById('footer-placeholder');
  const mp = document.getElementById('modal-placeholder');
  const pp = document.getElementById('process-placeholder');
  const rp = document.getElementById('reviews-placeholder');
  const ap = document.getElementById('areas-placeholder');
  const cp = document.getElementById('cta-placeholder');

  if (hp) hp.outerHTML = HEADER;
  if (mp) mp.outerHTML = MODAL_HTML;
  if (pp) pp.outerHTML = PROCESS_HTML;
  if (rp) rp.outerHTML = REVIEWS_SECTION_HTML;
  if (ap) ap.outerHTML = AREAS_SECTION_HTML;
  if (cp) cp.outerHTML = CTA_SECTION_HTML;
  if (fp) fp.outerHTML = FOOTER_HTML;

  // WhatsApp floating button
  if (!document.querySelector('.wa-float')) {
    const waDiv = document.createElement('div');
    waDiv.innerHTML = WA_BUTTON_HTML;
    document.body.appendChild(waDiv.firstElementChild);
  }

  loadPhoneFlags();

  if (activePage) {
    document.querySelectorAll(`[data-page="${activePage}"]`).forEach(el => el.classList.add('active'));
  }
}
