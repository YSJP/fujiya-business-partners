# Plan: Astro 6 / Tailwind CSS 4 Migration

## Goal

Astro 6 で `astro/` 配下の Web サイトを継続運用する前提で、Tailwind CSS 3.4 系から Tailwind CSS 4 系へ安全に移行する。

この移行の主目的は Tailwind 4.3 の新 utility 採用ではなく、Astro 6 世代で deprecated になっている `@astrojs/tailwind` 依存を外し、Tailwind 公式の `@tailwindcss/vite` 構成へ寄せること。

## Source Basis

- Tailwind 公式 Astro guide:
  - `tailwindcss` と `@tailwindcss/vite` を導入する。
  - `astro.config.mjs` の `vite.plugins` に Tailwind Vite plugin を追加する。
  - CSS entry は `@import "tailwindcss";` を使う。
- Astro 公式 `@astrojs/tailwind` page:
  - `@astrojs/tailwind` は deprecated。
  - Astro で Tailwind 4 を使う推奨経路は Tailwind Vite plugin。
- Tailwind 公式 upgrade guide:
  - v4 では `@tailwind` directives は使わず `@import "tailwindcss";` に移行する。
  - JavaScript config は後方互換として残るが自動検出されないため、必要なら CSS から `@config` で明示読み込みする。
  - `theme()` は可能な限り CSS variables へ置き換えることが推奨される。

## Current State

- 対象: `astro/`
- 現行依存:
  - `astro`: `^6.1.3`
  - `@astrojs/tailwind`: `^6.0.2`
  - `tailwindcss`: `^3.4.17` (`package-lock.json` 上は `3.4.19`)
- Tailwind 関連ファイル:
  - `astro/package.json`
  - `astro/package-lock.json`
  - `astro/astro.config.mjs`
  - `astro/tailwind.config.mjs`
  - `astro/src/styles/global.css`
- 現 CSS の特徴:
  - `@tailwind components;` と `@tailwind utilities;` を使用している。
  - `@apply` を複数箇所で使用している。
  - `theme(...)` を多数使用している。
  - design token は `tailwind.config.mjs` の `theme.extend` に集約されている。
- 現サイト構成:
  - Astro preview/build 側が `astro/` に存在する。
  - root 静的 HTML/CSS も残っているが、今回の移行対象には含めない。

## Triad Review

### Tech Lead

移行推奨。

理由:

- Astro 6 を継続するなら、deprecated integration である `@astrojs/tailwind` を残す合理性が弱い。
- Tailwind 4 の公式 Astro 構成は Vite plugin であり、Astro 6 の構成とも自然に合う。
- ただし、この repo は utility class 直書き中心ではなく `global.css` の component layer、`@apply`、`theme()`、JS config token に依存している。したがって単純な `npm install tailwindcss@latest` ではなく、CSS token 移行を含む互換作業として扱う必要がある。

判断:

- `@astrojs/tailwind` の削除と `@tailwindcss/vite` への移行は実施する。
- `tailwind.config.mjs` を残すか、CSS-first token へ寄せるかは build と差分確認で決める。
- 最小成功ルートは `@config "../tailwind.config.mjs";` で既存 config を明示読み込みし、まず表示維持を優先すること。
- 100 点に近い保守ルートは、既存 design token を CSS variables / `@theme` へ段階移行し、`theme()` 依存を減らすこと。

### QA

条件付きで移行賛成。

主なリスク:

- `@tailwind` directive 廃止に伴う CSS entry 差分。
- JS config 自動検出廃止により、独自 token が読み込まれず `@apply text-title` などが失敗または意図しない CSS になる可能性。
- `theme()` の解決差分により、余白、色、shadow、border radius、line-height が変わる可能性。
- Tailwind 4 の default border / ring / preflight / hover behavior 変更により、見た目や mobile hover が微差分を持つ可能性。

必須検証:

- `npm run build` が成功する。
- 生成された主要ページを確認する。
  - `/`
  - `/faq/`
  - `/form/`
  - `/privacy/`
- desktop と mobile 幅で確認する。
  - desktop: 1280px 前後
  - mobile: 390px 前後
- 重点チェック項目:
  - logo と背景画像の表示位置
  - card 幅、余白、shadow、border radius
  - 見出し、本文、注記の font size
  - menu overlay の開閉
  - FAQ accordion の開閉、`aria-expanded` 更新、answer の overflow
  - form redirect box と loader

合格基準:

- build error がない。
- 主要ページで layout collapse、文字重なり、表示欠落がない。
- 既存デザインからの差分が保守移行として説明可能な軽微差分に収まる。
- 差分が説明不能な場合は Tailwind 4 導入を一旦止め、原因を plan に戻す。

### PM

移行推奨。ただし「今すぐ見た目を変える施策」ではない。

価値:

- Astro 6 運用の基盤を現行公式推奨に合わせる。
- deprecated integration を減らし、次回の依存更新コストを下げる。
- preview/build 系が本番運用に近づくほど、早期に負債を処理する価値が上がる。

優先順位:

- 公開サイトのコンテンツ価値を上げる施策ではないため、UI 改修や新機能とは分ける。
- ただし Astro 6 を継続採用する判断が固まっているなら、先送りし続ける理由は弱い。

## Decision

Tailwind 4 へ移行する。

ただし、採用単位は次の順にする。

1. `@astrojs/tailwind` を外し、`@tailwindcss/vite` 構成へ移行する。
2. 既存表示を維持するため、まず `tailwind.config.mjs` を `@config` で明示読み込みする route を試す。
3. `theme()` が残っても build と表示が安定するなら、初回 migration では無理に全面 CSS-first 化しない。
4. build または表示で問題が出る token は CSS variables / `@theme` へ最小範囲で移す。
5. Tailwind 4.3 新 utility の採用は今回行わない。

## Scope

実装承認後に変更してよいファイル:

- `astro/package.json`
- `astro/package-lock.json`
- `astro/astro.config.mjs`
- `astro/src/styles/global.css`
- `astro/tailwind.config.mjs`

必要になった場合のみ変更してよいファイル:

- `astro/README.md`
  - Tailwind 4 移行後の開発コマンドや構成説明が古くなる場合のみ。

## Out of Scope

- root の静的 HTML/CSS の再設計。
- 公開文言、会社情報、FAQ 内容、フォーム URL の変更。
- デザイン刷新。
- Tailwind 4.3 の新 utility を使うためだけの UI 改修。
- Cloudflare Pages 設定変更。
- Astro major version の追加更新。
- Playwright など新しい E2E infrastructure の恒久追加。

## Risk Assessment

- 機密漏洩リスク: 1%
  - 対象は公開 Web assets と依存定義であり、秘密情報ファイルを読む必要はない。
- build 失敗リスク: 中
  - Tailwind 4 の CSS entry、Vite plugin、JS config 明示読み込みが必要。
- 表示崩れリスク: 中
  - `@apply`、`theme()`、preflight/default style 差分がある。
- scope creep リスク: 中
  - Tailwind 4 を機に CSS 全面整理へ広げると、保守移行の範囲を超える。
- 運用影響リスク: 低から中
  - `astro/` が Cloudflare Pages 本線なら本番表示に影響する。preview のみなら低い。

## Implementation Strategy

### Phase 0: Baseline Snapshot

1. `git status --short` で作業前差分を確認する。
2. `astro/` の現行 build が可能か確認する。
   - `npm run build`
3. 可能なら現行 build の表示を簡易確認し、比較基準を持つ。
   - 既に build が壊れている場合は、Tailwind 4 移行前の既存不具合として記録し、移行作業と混ぜない。

### Phase 1: Dependency Migration

1. `astro/package.json` から `@astrojs/tailwind` を削除する。
2. `tailwindcss` を 4 系へ更新する。
3. `@tailwindcss/vite` を追加する。
4. `npm install` で `package-lock.json` を更新する。

### Phase 2: Astro Config Migration

1. `astro/astro.config.mjs` から `@astrojs/tailwind` import と `tailwind()` integration を削除する。
2. `@tailwindcss/vite` を import する。
3. `defineConfig` に `vite.plugins: [tailwindcss()]` を追加する。
4. 既存の `site` 設定は維持する。

### Phase 3: CSS Entry Migration

1. `astro/src/styles/global.css` の先頭を Tailwind 4 形式へ変更する。
2. 第一候補:
   - `@import "tailwindcss";`
   - `@config "../../tailwind.config.mjs";`
3. `@tailwind components;` / `@tailwind utilities;` は削除する。
4. 既存 `@layer components` は維持する。
5. build で config token が解決できるか確認する。

### Phase 4: Token Compatibility

1. `@apply` が参照している独自 utility を確認する。
   - `text-title`
   - `text-term`
   - `text-body`
   - `text-intro`
   - `text-note`
   - `text-menu`
   - `text-form`
   - `text-site-*`
   - `shadow-card`
   - `shadow-faq`
   - `rounded-panel`
2. `theme(...)` 参照が Tailwind 4 build で通るか確認する。
3. build が通り、表示が維持される場合:
   - 初回 migration では `theme()` 全面置換は行わない。
   - follow-up として CSS variables / `@theme` 化を提案する。
4. build または表示が壊れる場合:
   - 壊れた token のみ CSS variables / `@theme` へ移行する。
   - 全面整理は避ける。

### Phase 5: Verification

1. `npm run build` を実行する。
2. build output を確認する。
3. 必要に応じて `npm run preview` を起動し、主要ページを確認する。
4. desktop と mobile で visual check する。
5. FAQ accordion と menu overlay は手動操作または browser automation で確認する。
6. `git diff` を確認し、想定外のファイル変更がないことを確認する。

### Phase 6: Review Closeout

1. 変更ファイル一覧を clickable path で提示する。
2. 実行した検証コマンドと結果を提示する。
3. 残リスクを提示する。
4. `C:\Users\TFG152\.codex\baseline\guides\repo.md` 準拠の commit message 案を、最終 diff 確認後に提示する。
5. User 承認前に commit / push / merge は行わない。

## Rollback Criteria

次のいずれかに当たる場合、Tailwind 4 移行を一旦止める。

- `npm run build` が Tailwind 設定または CSS token 起因で解決困難に失敗する。
- 主要ページで layout collapse が発生する。
- 既存 design token を CSS-first 化するために広範囲な CSS rewrite が必要になる。
- Astro 6 / Tailwind 4 以外の依存更新が連鎖し、保守移行の範囲を超える。

停止した場合は、Tailwind 3.4 継続の判断材料、失敗ログ要約、次の移行案を plan に戻す。

## Done When

- `astro/` が Tailwind 4 + `@tailwindcss/vite` 構成になっている。
- `@astrojs/tailwind` 依存と import が残っていない。
- `npm run build` が成功している。
- `/`, `/faq/`, `/form/`, `/privacy/` の表示確認が完了している。
- menu overlay と FAQ accordion の基本操作が確認済み。
- 変更範囲が `Scope` 内に収まっている。
- 最終 diff、変更ファイル一覧、検証結果、残リスク、commit message 案を User に提示している。

## Approval Gate

この plan は実装前の計画であり、まだ依存更新・コード変更・build 実行は行わない。

実装開始には User の明示承認を必要とする。

承認依頼時の機密漏洩リスク評価: 1%
