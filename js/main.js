/* ================================================
   MAIN JS — Interactivity
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- GHL Form Submission ---- */
  function submitToGHL(name, phone, message, email) {
    fetch('/api/contact', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ name, phone, message, email: email || '' }),
    }).catch(() => {});
  }

  /* Hero inline quote form */
  const heroForm = document.getElementById('hero-quote-form');
  const heroSuccess = document.getElementById('hero-form-success');
  if (heroForm && heroSuccess) {
    heroForm.addEventListener('submit', e => {
      e.preventDefault();
      if (!heroForm.checkValidity()) { heroForm.reportValidity(); return; }
      const name  = (heroForm.querySelector('[name="name"]')?.value || '').trim();
      const phone = (heroForm.querySelector('[name="phone"]')?.value || '').trim();
      const msg   = (heroForm.querySelector('[name="message"]')?.value || '').trim();
      submitToGHL(name, phone, msg, '');
      heroForm.style.display = 'none';
      heroSuccess.style.display = 'block';
      setTimeout(() => {
        heroForm.reset();
        heroForm.style.display = 'block';
        heroSuccess.style.display = 'none';
      }, 4000);
    });
  }

  /* Sticky header */
  const header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  /* Hamburger / mobile nav */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    document.addEventListener('click', e => {
      if (mobileNav.classList.contains('open') && !mobileNav.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* Mobile dropdown accordions */
  document.querySelectorAll('.mobile-dropdown-title').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.target;
      const items = document.getElementById(id);
      if (!items) return;
      const isOpen = items.classList.toggle('open');
      btn.classList.toggle('open', isOpen);
    });
  });

  /* Modal */
  const overlay = document.getElementById('modal-overlay');
  const closeBtn = document.getElementById('modal-close');

  function openModal() {
    if (overlay) { overlay.classList.add('open'); document.body.style.overflow = 'hidden'; }
  }
  function closeModal() {
    if (overlay) { overlay.classList.remove('open'); document.body.style.overflow = ''; }
  }

  document.querySelectorAll('.open-modal').forEach(el => el.addEventListener('click', openModal));
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (overlay) overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  /* Quote form (modal) */
  const qForm = document.getElementById('quote-form');
  const qSuccess = document.getElementById('quote-success');
  if (qForm && qSuccess) {
    qForm.addEventListener('submit', e => {
      e.preventDefault();
      if (!qForm.checkValidity()) { qForm.reportValidity(); return; }
      const name  = (qForm.querySelector('[name="name"]')?.value || '').trim();
      const phone = (qForm.querySelector('[name="phone"]')?.value || '').trim();
      const msg   = (qForm.querySelector('[name="message"]')?.value || '').trim();
      submitToGHL(name, phone, msg, '');
      qForm.style.display = 'none';
      qSuccess.style.display = 'block';
      setTimeout(() => { qForm.reset(); qForm.style.display = 'block'; qSuccess.style.display = 'none'; closeModal(); }, 4000);
    });
  }

  /* Contact form */
  const cForm = document.getElementById('contact-form');
  const cSuccess = document.getElementById('contact-success');
  if (cForm && cSuccess) {
    cForm.addEventListener('submit', e => {
      e.preventDefault();
      if (!cForm.checkValidity()) { cForm.reportValidity(); return; }
      const name  = (cForm.querySelector('[name="name"]')?.value || '').trim();
      const phone = (cForm.querySelector('[name="phone"]')?.value || '').trim();
      const email = (cForm.querySelector('[name="email"]')?.value || '').trim();
      const msg   = (cForm.querySelector('[name="message"]')?.value || '').trim();
      submitToGHL(name, phone, msg, email);
      cForm.style.display = 'none';
      cSuccess.style.display = 'block';
    });
  }

  /* FAQ accordion */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* Gallery / Projects filter */
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.gallery-item').forEach(item => {
        item.classList.toggle('hidden', filter !== 'all' && item.dataset.category !== filter);
      });
      document.querySelectorAll('.project-item').forEach(item => {
        item.classList.toggle('hidden', filter !== 'all' && item.dataset.cat !== filter);
      });
    });
  });

  /* Smooth scroll */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

});
