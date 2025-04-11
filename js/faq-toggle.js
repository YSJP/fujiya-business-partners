function setupFaqToggles() {
  document.querySelectorAll('#page-faq .faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const isActive = item.classList.toggle('active');
      button.setAttribute('aria-expanded', isActive);
    });
  });
}

document.addEventListener('DOMContentLoaded', setupFaqToggles);