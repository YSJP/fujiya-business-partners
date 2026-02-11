# コンテキスト

- 対象タスクは、初回表示時にCSS未適用状態が見えるチラつき（FOUC）の解消。
- 原因は `js/load-modules.js` による `head` の動的挿入と、`preload + onload` でのCSS適用遅延。
- 承認済み計画として [plan.md](plan.md) を作成し、計画に沿って実装を実施。
- 実装では各ページの `head` を静的化し、CSSを通常の `rel="stylesheet"` で初期HTMLから読み込む構成へ変更。
- `js/load-modules.js` は `logo/nav/footer` の読み込みのみに限定し、`head` 操作を削除。
- 追加タスクとして、GitHub Pages 上で `plan.md` などの運用文書が直接閲覧できる問題に対応。
- `_config.yml` を追加し、`README.md` `plan.md` `context.md` を Jekyll の `exclude` に設定して公開出力から除外。
