function setupFaqToggles() {
  document.querySelectorAll('#page-faq .faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const isActive = item.classList.toggle('active');
      button.setAttribute('aria-expanded', isActive);
    });
  });

  // ▼ アンカー付きアクセス時に該当FAQを開く
  const hash = window.location.hash;
  if (hash && hash.startsWith("#faq-")) {
    const targetItem = document.querySelector(hash);
    if (targetItem && targetItem.classList.contains("faq-item")) {
      targetItem.classList.add("active");
      const button = targetItem.querySelector(".faq-question");
      if (button) button.setAttribute("aria-expanded", "true");

      // スクロール調整（オプション）
      setTimeout(() => {
        targetItem.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }
}

document.addEventListener('DOMContentLoaded', setupFaqToggles);