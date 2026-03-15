# Astro プレビュー導入計画 v2 <!-- Astro preview adoption plan v2 -->

## Goal / Context / Constraints / Done-When <!-- Goal / Context / Constraints / Done-When -->

- Goal: 既存の静的本番サイトを変更せずに、`astro/` 配下へ `Astro + Tailwind` の試作サイトを追加し、`Cloudflare Pages` の preview URL で実ページ相当の見た目と導線を確認できる状態を作る <!-- Goal: Add a prototype site under `astro/` with Astro + Tailwind without changing the current static production site, and make it viewable on a Cloudflare Pages preview URL with production-equivalent appearance and navigation -->
- Context: 現行サイトは少数ページの静的HTMLで、共通部品は `js/load-modules.js` による実行時 `fetch` 読込、動的要素はFAQ開閉とフォーム転送のみである <!-- Context: The current site is a small static HTML site, shared parts are loaded at runtime via `js/load-modules.js`, and dynamic behavior is limited to FAQ toggles and form redirect -->
- Constraints: 既存の `index.html`、`faq/`、`form/`、`privacy/`、`css/`、`js/`、`img/` は変更しない。preview 検証のための最小構成に限定し、本番併設パス `/astro/` の最適化は今回の対象外とする <!-- Constraints: Do not modify the existing `index.html`, `faq/`, `form/`, `privacy/`, `css/`, `js/`, or `img/`; limit scope to the minimum needed for preview validation, and exclude optimization for a production `/astro/` path in this iteration -->
- Done-When: `astro/` 配下に独立した Astro プロジェクトが作成され、トップ/FAQ/プライバシー/フォーム導線の4ページが再現され、共通レイアウト・メタ情報・主要画像・FAQ挙動・フォーム遷移が preview 上で確認でき、`Cloudflare Pages` 用ビルド設定が明示されている <!-- Done-When: An independent Astro project exists under `astro/`, the four pages for home/FAQ/privacy/form flow are recreated, shared layout/meta/primary images/FAQ behavior/form redirect are verified in preview, and Cloudflare Pages build settings are explicitly documented -->

## 三者協議レビュー <!-- Triad review -->

- Tech Lead 1回目: 78点。構造移行の方向性は妥当だが、アセットの扱いとレイアウト責務が曖昧で、実装時に二重管理へ流れる余地がある <!-- Tech Lead round 1: 78 points. The migration direction is sound, but asset handling and layout responsibilities are ambiguous, leaving room for dual management during implementation -->
- QA 1回目: 74点。preview 成功条件が不十分で、FAQ挙動、画像参照、フォーム転送、meta 差分の確認漏れが起き得る <!-- QA round 1: 74 points. Preview success criteria are insufficient, and verification gaps may occur for FAQ behavior, image references, form redirect, and meta differences -->
- PM 1回目: 82点。試作の目的は明確だが、「この試作で何を学び、何を決めるか」が弱く、学習投資の回収条件が見えにくい <!-- PM round 1: 82 points. The prototype purpose is clear, but it does not clearly state what will be learned or decided, making the return on learning investment hard to judge -->

- 改善方針 1: Astro 側は `layout/components/pages` の責務分離を先に固定し、既存 `includes/` の実行時読込を Astro のビルド時合成へ置換する方針を明文化する <!-- Improvement 1: Fix responsibilities for `layout/components/pages` first on the Astro side, and explicitly state that runtime loading from existing `includes/` will be replaced with Astro build-time composition -->
- 改善方針 2: preview 検証項目をページ表示、主要画像、内部リンク、FAQ挙動、フォーム転送、head系メタの6項目に分解する <!-- Improvement 2: Break preview verification into six items: page rendering, primary images, internal links, FAQ behavior, form redirect, and head/meta -->
- 改善方針 3: この試作の意思決定成果を「Astro継続採用の可否判断材料を揃えること」と明記する <!-- Improvement 3: Explicitly define the decision outcome of this prototype as collecting enough evidence to decide whether to continue adopting Astro -->

- Tech Lead 2回目: 94点。責務分離とアセット方針が具体化され、試作として過不足が小さくなった <!-- Tech Lead round 2: 94 points. Responsibility separation and asset policy are concrete, making the prototype scope nearly right-sized -->
- QA 2回目: 96点。検証観点が列挙され、回帰リスクの見落としが大きく減った <!-- QA round 2: 96 points. Verification aspects are enumerated, substantially reducing the chance of missing regressions -->
- PM 2回目: 100点。試作の価値が「導入判断の材料集め」に収束し、意思決定コストに見合う形になった <!-- PM round 2: 100 points. The prototype value is focused on collecting evidence for adoption decisions, which now matches decision-making cost -->

- 最終合意: 100点。今回の作業は「本番移行」ではなく「Astro学習と導入判断のための preview 試作」であると定義する <!-- Final agreement: 100 points. Define this work as a preview prototype for Astro learning and adoption decisions, not as a production migration -->

## 実装方針 <!-- Implementation approach -->

- Astro 側は独立プロジェクトとして `astro/` 配下に閉じる <!-- Keep the Astro side as an isolated project under `astro/` -->
- 既存の `includes/*.html` は直接実行時読込せず、Astro コンポーネントへ変換する <!-- Do not load existing `includes/*.html` at runtime; convert them into Astro components -->
- 既存の見た目は初回試作では極力踏襲し、Tailwind は「全面リデザイン」ではなく「構造整理と局所置換」に使う <!-- Preserve the existing look as much as possible in the first prototype; use Tailwind for structural cleanup and selective replacement rather than a full redesign -->
- FAQ は Astro ページ上で最小JSを持たせて現行挙動を再現する <!-- Recreate current FAQ behavior with minimal JS on the Astro page -->
- フォームページは現行の Google Forms 転送導線を維持する <!-- Keep the current Google Forms redirect flow for the form page -->

## Work Items <!-- Work Items -->

- [ ] `astro/` のプロジェクト骨格を作成し、`package.json`、`astro.config.mjs`、Tailwind 設定を揃える <!-- Create the `astro/` project skeleton and add `package.json`, `astro.config.mjs`, and Tailwind configuration -->
- [ ] 共通責務を `src/layouts` と `src/components` へ分離し、head・nav・logo・footer の置換方針を実装に落とせる形へ整理する <!-- Separate shared responsibilities into `src/layouts` and `src/components`, and organize head/nav/logo/footer replacement into an implementation-ready form -->
- [ ] `src/pages` にトップ、FAQ、プライバシー、フォームの4ページを作成し、現行導線を再現する <!-- Create four pages under `src/pages` for home, FAQ, privacy, and form, reproducing current navigation -->
- [ ] 画像・favicon・OG画像の参照先を preview で壊れない形に整える <!-- Adjust references for images, favicons, and OG images so they remain valid in preview -->
- [ ] FAQ の開閉とフォーム転送を確認可能な最小JSを整える <!-- Prepare the minimal JS needed to verify FAQ toggles and form redirect -->
- [ ] `Cloudflare Pages` の build command と output directory を明記し、preview 作成手順を残す <!-- Document the Cloudflare Pages build command and output directory, and leave the preview creation steps -->
- [ ] ローカルで build または preview 相当の検証を行い、差分と未確認事項を記録する <!-- Run local build or preview-equivalent verification, and record differences and remaining unchecked items -->

## 検証チェックリスト <!-- Verification checklist -->

- [ ] トップページが既存相当の情報量と主要画像で表示される <!-- Verify the home page renders with production-equivalent information density and primary image -->
- [ ] FAQ ページで項目開閉とアンカー付き表示が破綻しない <!-- Verify FAQ toggles and hash-anchor behavior do not break -->
- [ ] プライバシーページの本文構造とリンクが保たれている <!-- Verify the privacy page body structure and links are preserved -->
- [ ] フォームページから Google Forms 転送が成立する <!-- Verify the form page redirect to Google Forms works -->
- [ ] head 要素の title、description、OG 系がページごとに設定される <!-- Verify title, description, and OG meta are set per page -->
- [ ] 主要な画像・favicon 参照が 404 にならない <!-- Verify primary images and favicon references do not return 404 -->

## Out of Scope <!-- Out of Scope -->

- 本番ドメイン配下の `/astro/` 併設配信 <!-- Production deployment under `/astro/` on the main domain -->
- 既存静的サイトの置換または削除 <!-- Replacement or deletion of the existing static site -->
- 全面デザイン刷新 <!-- Full visual redesign -->
- CMS 導入や記事管理機能の追加 <!-- CMS introduction or article management features -->
