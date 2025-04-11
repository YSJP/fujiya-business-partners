// head.html 読み込み＋タイトルなどを置換して挿入
fetch('/includes/head.html')
  .then(res => res.text())
  .then(html => {
    for (const key in pageMeta) {
      html = html.replaceAll(key, pageMeta[key]);
    }
    document.head.innerHTML = html + document.head.innerHTML;
  });

// ロゴ（ヘッダー）読み込み
fetch('/includes/logo.html')
  .then(res => res.text())
  .then(html => {
    const target = document.querySelector('.module-header-logo');
    if (target) target.innerHTML = html;
  });

// ▼ ナビゲーションメニューの読み込みは nav-toggle.js に移管済み
// The navigation module (/includes/nav.html) is loaded and initialized via nav-toggle.js,
// so it is not handled here.

// フッター読み込み
fetch('/includes/footer.html')
  .then(res => res.text())
  .then(html => {
    const footer = document.querySelector('.footer');
    if (footer) footer.innerHTML = html;
  });
