# Bootstrap JavaScript security fix closeout

## 概要

- 実施日: 2026-10-28
- 対象: ルート直下に残る既存静的サイト
- 問題: jsDelivr の Bootstrap JavaScript を SRI なしで実行していた
- 対応: Bootstrap JavaScript が未使用であることを確認し、外部 script 読み込みを削除した
- 最終 commit: `b588cda12558a29842489fd5dbd78d524e644d99`

Bootstrap CSS は既存表示を維持するため変更していません。Astro 版には対象の外部 JavaScript 読み込みがなく、今回の変更対象外です。

## 変更対象

- `index.html`
- `faq/index.html`
- `form/index.html`
- `privacy/index.html`
- `includes/head.html`

各ファイルから `bootstrap.bundle.min.js` の外部 script tag を 1 行ずつ削除しました。

## 判断根拠

- リポジトリ内に `data-bs-*` 属性はありませんでした。
- Bootstrap JavaScript API の呼び出しはありませんでした。
- ナビゲーションは `js/load-modules.js`、FAQ は `js/faq-toggle.js`、フォーム転送は `form/index.html` の inline script で処理しています。
- 未使用の第三者 JavaScript に SRI を追加して残すより、読み込み自体を削除する方が攻撃面を狭くできます。

## 検証証跡

### Source: passed

- 最終差分は 5 ファイル、5 行削除のみです。
- Bootstrap CSSと既存のローカル JavaScript は変更していません。

### Static: passed

- `bootstrap.bundle.min.js` のリポジトリ内検索は 0 件でした。
- `data-bs-*` と Bootstrap JavaScript API の検索は 0 件でした。
- `node --check js/load-modules.js` は成功しました。
- `node --check js/faq-toggle.js` は成功しました。
- `git diff --check` は成功しました。
- 独立したバイパス・回帰レビューで、残存経路や具体的な回帰は確認されませんでした。

### Git: passed

- `b588cda12558a29842489fd5dbd78d524e644d99` を `origin/main` へ反映しました。
- `HEAD` と `origin/main` は一致しました。
- upstream 差分は `0 0`、作業ツリーは clean でした。

### Deployment: not applicable

- 今回は明示的な FTP、Cloudflare 設定変更、手動 deployment を行っていません。
- 現行 Cloudflare Pages は `astro/` を build root とするため、変更した既存静的サイトのファイルは現行 Astro build output に含まれません。

### Public: passed with limitation

- `https://fujiya-bp.com/` は Astro 版を配信していました。
- `/`、`/faq/`、`/form/`、`/privacy/` の主要表示を確認しました。
- fullscreen menu の開閉、FAQ の click 開閉、FAQ hash 指定の自動展開、Google Form への転送を確認しました。
- 公開ページで `bootstrap.bundle.min.js` は読み込まれておらず、ブラウザの error / warning は確認されませんでした。
- この公開確認は Astro 版の健全性を示しますが、今回変更した既存静的サイトのファイルが外部へ deployment された証拠ではありません。

## 残留事項

- 既存静的サイトの公開経路が再度有効になる場合も、対象の外部 Bootstrap JavaScript 読み込みは削除済みです。
- 現行 Astro 版の menu 起動要素は `div.menu-toggle` で、`role` と `aria-label` がありません。マウス操作は確認済みですが、キーボードおよびスクリーンリーダー対応は別タスクとして扱います。
- rawログ、ブラウザスクリーンショット、credential、token、cookie、個人情報はこの記録へ保存していません。
