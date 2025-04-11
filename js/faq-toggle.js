function setupFaqToggles() {
    document.querySelectorAll('#page-faq .faq-question').forEach(button => {
      button.addEventListener('click', () => {
        const item = button.closest('.faq-item');
        item.classList.toggle('active');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', setupFaqToggles);
