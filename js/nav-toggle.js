// nav-toggle.js

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
}

// nav.html の読み込み + 初期化
fetch('/includes/nav.html')
  .then(res => res.text())
  .then(html => {
    const navContainer = document.querySelector('.module-nav');
    if (navContainer) {
      navContainer.innerHTML = html;
      setupNavMenu();
    }
  });
