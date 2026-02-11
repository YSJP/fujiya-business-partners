// ロゴ（ヘッダー）読み込み
fetch('/includes/logo.html')
  .then(res => res.text())
  .then(html => {
    const target = document.querySelector('.module-header-logo');
    if (target) target.innerHTML = html;
  });

// ナビゲーションメニューの読み込み
fetch('/includes/nav.html')
  .then(res => res.text())
  .then(html => {
    const navContainer = document.querySelector('.module-nav');
    if (navContainer) {
      navContainer.innerHTML = html;
      setupNavMenu();
    }
  });

function setupNavMenu() {
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('fullscreenMenu');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
    });
  });

  const closeBtn = document.getElementById('menuClose');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      menu.classList.remove('active');
    });
  }

}

// フッター読み込み
fetch('/includes/footer.html')
  .then(res => res.text())
  .then(html => {
    const footer = document.querySelector('.footer');
    if (footer) footer.innerHTML = html;
  });
