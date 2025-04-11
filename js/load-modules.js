// head.html 読み込み＋タイトルなどを置換して挿入
fetch('/includes/head.html')
  .then(res => res.text())
  .then(html => {
    for (const key in pageMeta) {
      html = html.replaceAll(key, pageMeta[key]);
    }
    document.head.innerHTML = html + document.head.innerHTML;
  });

// フッター読み込み
fetch('/includes/footer.html')
  .then(res => res.text())
  .then(html => {
    const footer = document.querySelector('.footer');
    if (footer) footer.innerHTML = html;
  });
