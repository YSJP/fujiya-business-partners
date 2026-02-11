# Handoff Plan: Fix initial CSS flicker (FOUC) on https://fujiya-bp.com/ <!-- 引き継ぎ計画: https://fujiya-bp.com/ の初期CSSチラつき(FOUC)を修正 -->

## Context <!-- 背景 -->
- The user will switch Codex permissions, and this chat context may be reset. <!-- ユーザーはCodexの権限を切り替える予定で、このチャット文脈がリセットされる可能性がある。 -->
- The issue is: unstyled HTML is visible for a few hundred milliseconds before CSS applies. <!-- 問題は: CSS適用前に数百ミリ秒ほど未スタイルHTMLが表示されること。 -->

## What has already been confirmed <!-- 既に確認済みの内容 -->
- `index.html` loads `/js/load-modules.js` and does not include static stylesheet links in initial HTML. <!-- `index.html` は `/js/load-modules.js` を読み込み、初期HTMLに静的なstylesheetリンクがない。 -->
- `js/load-modules.js` fetches `/includes/head.html` and injects it via `document.head.innerHTML`. <!-- `js/load-modules.js` は `/includes/head.html` をfetchし、`document.head.innerHTML` で挿入している。 -->
- `includes/head.html` uses `rel="preload"` with `onload` to switch to `rel="stylesheet"` for CSS. <!-- `includes/head.html` はCSSに `rel="preload"` と `onload` による `rel="stylesheet"` への切替を使っている。 -->
- The above causes FOUC by design (styles are applied after JS + network + onload timing). <!-- 上記により、JS実行+通信+onloadの後にスタイル適用される設計となり、FOUCが発生する。 -->

## Scope approved by user intent <!-- ユーザー意図に基づく作業範囲 -->
- Prepare implementation plan now; do not implement yet in this chat unless user asks after permission switch. <!-- 今は実装前の引き継ぎ計画を作成し、権限切替後にユーザー指示があるまで実装しない。 -->
- Fix only CSS first-paint flicker; do not add unrelated refactors. <!-- CSS初期表示のチラつきのみ修正し、無関係なリファクタは行わない。 -->

## Implementation steps for next Codex <!-- 次のCodex向け実装手順 -->
1. Replace runtime head injection with static `<head>` in each page (`index.html`, `faq/index.html`, `form/index.html`, `privacy/index.html`). <!-- 実行時head挿入をやめ、各ページ(`index.html`, `faq/index.html`, `form/index.html`, `privacy/index.html`)に静的`<head>`を配置する。 -->
2. Keep dynamic module loading only for body fragments (`nav`, `logo`, `footer`) if needed. <!-- 必要に応じて動的読込はbody断片(`nav`, `logo`, `footer`)のみに限定する。 -->
3. Change CSS loading from preload-switch pattern to normal blocking stylesheet links at initial parse. <!-- CSS読込をpreload切替方式から、初期パース時に確実適用される通常のstylesheetリンクへ変更する。 -->
4. Ensure page meta replacement logic is removed or converted to static page-specific meta values. <!-- ページメタ置換ロジックは削除するか、ページ固有の静的メタ値へ置き換える。 -->
5. Validate in browser: first paint must already be styled (no visible jump). <!-- ブラウザ検証で、初回描画時点からスタイル適用済み（見た目ジャンプなし）を確認する。 -->

## Acceptance criteria <!-- 完了条件 -->
- No visible unstyled flash on hard reload for `https://fujiya-bp.com/` equivalent local pages. <!-- `https://fujiya-bp.com/` 相当のローカルページをハードリロードしても未スタイル表示が見えない。 -->
- CSS files are referenced as `rel="stylesheet"` in initial HTML response. <!-- CSSファイルが初期HTMLレスポンス内で `rel="stylesheet"` として参照されている。 -->
- `js/load-modules.js` no longer mutates `document.head.innerHTML`. <!-- `js/load-modules.js` が `document.head.innerHTML` を変更しない。 -->

## Files expected to change <!-- 変更想定ファイル -->
- `index.html` <!-- `index.html` -->
- `faq/index.html` <!-- `faq/index.html` -->
- `form/index.html` <!-- `form/index.html` -->
- `privacy/index.html` <!-- `privacy/index.html` -->
- `js/load-modules.js` <!-- `js/load-modules.js` -->
- (optional) `includes/head.html` if no longer used for runtime injection. <!-- （任意）実行時挿入で使わなくなる場合は `includes/head.html` 。 -->

## Notes for next Codex <!-- 次のCodexへの注意 -->
- Follow AGENTS.md: plan -> approval -> implementation. <!-- AGENTS.mdに従い、計画->承認->実装の順序を守る。 -->
- Report any plan updates with a clickable link: `[plan.md](plan.md)`. <!-- 計画更新報告はクリック可能リンク `[plan.md](plan.md)` を使う。 -->

---

## Task: Hide operational Markdown documents from GitHub Pages output <!-- タスク: OperationalなMarkdown文書をGitHub Pages公開物から除外 -->
- Goal: Keep documents in Git repository but prevent web visitors from opening them via `https://fujiya-bp.com/*.md`. <!-- 目的: 文書はGit管理に残しつつ、`https://fujiya-bp.com/*.md` で閲覧できない状態にする。 -->
- Target documents: `README.md`, `plan.md`, `context.md` (+ optional similar ops docs). <!-- 対象文書: `README.md`, `plan.md`, `context.md`（必要に応じて同種の運用文書）。 -->
- Approach: Add Jekyll config `_config.yml` with `exclude` entries for operational docs. <!-- 方針: Jekyll設定 `_config.yml` を追加し、`exclude` で運用文書を除外する。 -->
- Guardrail: Do not add `.nojekyll`, because that bypasses Jekyll exclude processing. <!-- 注意点: `.nojekyll` は追加しない（Jekyllの除外設定が効かなくなるため）。 -->
- Validation: Confirm `_config.yml` exists, includes exclusion entries, and `.nojekyll` is absent. <!-- 検証: `_config.yml` の存在と除外設定、および `.nojekyll` が無いことを確認する。 -->
- Finalization: Update `context.md`, commit, and push to `main`. <!-- 最終化: `context.md` を更新し、コミットして `main` へ push する。 -->
