/* Inicializa intl-tel-input em todos os campos de telefone */
(function initPhoneFlags() {
  function setup(input) {
    if (!input || input.dataset.itiFlagsInit) return;
    input.dataset.itiFlagsInit = '1';
    window.intlTelInput(input, {
      initialCountry: 'pt',
      preferredCountries: ['pt', 'br', 'es', 'fr', 'gb'],
      separateDialCode: true,
      utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@23/build/js/utils.js',
    });
  }

  function setupAll() {
    document.querySelectorAll('input[type="tel"]').forEach(setup);
  }

  /* Corre imediatamente e de novo após injectComponents (que usa outerHTML) */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupAll);
  } else {
    setupAll();
  }

  /* Observer para apanhar campos injetados depois do DOM carregar (modal, hero form) */
  const observer = new MutationObserver(() => setupAll());
  observer.observe(document.body, { childList: true, subtree: true });
})();
