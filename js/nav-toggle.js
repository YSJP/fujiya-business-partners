document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('fullscreenMenu');

  toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
  });

  // メニュー内リンクをクリックしたら閉じる（任意）
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
    });
  });
});
