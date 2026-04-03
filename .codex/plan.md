# Astro 6 更新計画 v2 <!-- Astro 6 upgrade plan v2 -->

## Goal / Context / Constraints / Done-When <!-- Goal / Context / Constraints / Done-When -->

- Goal: `astro/` 配下の試作サイトを `Astro 6 系` へ更新し、無料運用のまま既存4ページを維持できる状態を作る。加えて、将来 `/info/` を Astro ネイティブな content collection で追加できる土台を整える <!-- Goal: Upgrade the prototype site under `astro/` to the `Astro 6` line while preserving the existing four pages under a free operating model, and prepare a foundation for later adding `/info/` with Astro-native content collections -->
- Context: 現在の `astro/` は `Astro 5.13.2` を利用する独立試作であり、トップ・FAQ・プライバシー・フォームの4ページ、共通レイアウト、FAQ 開閉、フォーム転送を備える。無料前提のため EmDash 本体や有料 Cloudflare 機能は採用対象外とする <!-- Context: The current `astro/` is an isolated prototype using `Astro 5.13.2` with four pages for home, FAQ, privacy, and form, plus shared layout, FAQ toggles, and form redirect. Because operation must remain free, EmDash itself and paid Cloudflare features are out of scope -->
- Constraints: 既存静的サイト本体は変更しない。`astro/` の見た目と導線は極力維持し、全面リデザインはしない。依存更新は必要最小限に留め、無料で再現できない機能は採用しない <!-- Constraints: Do not modify the existing static site. Preserve the current look and navigation inside `astro/` as much as possible, avoid full redesign, keep dependency updates to the minimum needed, and do not adopt features that cannot be reproduced for free -->
- Done-When: `astro/` の依存・設定が `Astro 6 系` へ更新され、`npm run build` が成功し、既存4ページの主要表示・導線・FAQ 挙動・フォーム転送・head メタ・画像参照に回帰がないことを確認でき、残留課題と `/info/` 追加の前提条件が文書化されている <!-- Done-When: Dependencies and configuration in `astro/` are upgraded to the `Astro 6` line, `npm run build` succeeds, regressions are checked for key rendering, navigation, FAQ behavior, form redirect, head metadata, and image references across the existing four pages, and residual issues plus prerequisites for adding `/info/` are documented -->

## 三者協議レビュー <!-- Triad review -->

- Tech Lead 1回目: 86点。目的は整理されているが、更新対象の境界がまだ広い。`何を変えるか` だけでなく `何を変えないか` と `順序` を明示すべき <!-- Tech Lead round 1: 86 points. The objective is organized, but the upgrade boundary is still broad. The plan should explicitly define not only what changes, but also what does not change and in what order -->
- QA 1回目: 81点。検証観点はあるが、失敗条件と停止条件が弱い。`build 失敗時`、`表示崩れ発生時`、`FAQ/フォーム退行時` の扱いを明文化すべき <!-- QA round 1: 81 points. Verification aspects exist, but failure and stop conditions are weak. The handling of `build failures`, `visual regressions`, and `FAQ/form regressions` should be spelled out -->
- PM 1回目: 87点。無料前提は明快だが、今回の投資成果が将来の `/info/` 実装にどう接続するかが抽象的で、意思決定に使いにくい <!-- PM round 1: 87 points. The free-only premise is clear, but it is still abstract how this investment connects to future `/info/` implementation, making it less actionable for decision-making -->

- 改善方針 1: 実装順序を `依存確認 -> 設定差分吸収 -> ページ互換修正 -> build/preview 検証 -> 残課題整理` に固定する <!-- Improvement 1: Fix the implementation order as `dependency audit -> config compatibility updates -> page-level fixes -> build/preview verification -> residual issue summary` -->
- 改善方針 2: `停止条件` を設定し、`Astro 6` へ上げた結果 `無料運用` や `既存4ページ維持` を満たせない場合は、その時点で実装を止めて判断材料を返す <!-- Improvement 2: Define stop conditions so that if moving to `Astro 6` breaks either the `free operating model` or `preserving the existing four pages`, implementation stops and returns decision material at that point -->
- 改善方針 3: `/info/` への接続条件を、`content collection を載せられる構造維持`、`ページ共通レイアウト再利用`、`head 設定の共通化維持` の3点に限定して定義する <!-- Improvement 3: Limit future `/info/` connection conditions to three points: `keeping a structure ready for content collections`, `reusing the shared page layout`, and `preserving reusable head metadata configuration` -->

- Tech Lead 2回目: 96点。順序と境界は締まったが、`Astro 6` 更新で触れる代表ファイルが計画に見えたほうが作業精度は上がる <!-- Tech Lead round 2: 96 points. Order and scope are tighter, but execution quality would improve if the representative files touched by the `Astro 6` upgrade were visible in the plan -->
- QA 2回目: 95点。停止条件が入ったのは良いが、完了判定に `確認方法` が併記されると、実施漏れをさらに防げる <!-- QA round 2: 95 points. Adding stop conditions is good, but pairing completion checks with `how they are verified` would reduce omissions even more -->
- PM 2回目: 97点。将来接続条件は明確になった。残る課題は、今回やらないことを強く固定してスコープ逸脱を防ぐこと <!-- PM round 2: 97 points. The future connection conditions are now clear. The remaining gap is to lock down what will not be done so scope does not drift -->

- 改善方針 4: 代表更新対象を `astro/package.json`、`astro/package-lock.json`、`astro/astro.config.mjs`、必要に応じて `astro/src/**` と明示する <!-- Improvement 4: Explicitly identify representative upgrade targets as `astro/package.json`, `astro/package-lock.json`, `astro/astro.config.mjs`, and `astro/src/**` as needed -->
- 改善方針 5: 検証チェックに `確認方法` を添え、build はコマンド、FAQ/フォームは preview または実ページ挙動確認、head/画像は出力 HTML または表示確認と結びつける <!-- Improvement 5: Add `verification method` to each check, tying build to a command, FAQ/form to preview or runtime checks, and head/images to rendered HTML or visible inspection -->
- 改善方針 6: Out of Scope を強化し、`/info/` 実装、EmDash 導入、Cloudflare 有料機能、デザイン刷新、既存静的サイト変更を明確に排除する <!-- Improvement 6: Strengthen the out-of-scope list by explicitly excluding `/info/` implementation, EmDash adoption, paid Cloudflare features, visual redesign, and changes to the existing static site -->

- Tech Lead 3回目: 100点。変更対象、順序、停止条件、将来接続条件が揃い、実装判断に必要な情報が過不足ない <!-- Tech Lead round 3: 100 points. The plan now includes change targets, sequence, stop conditions, and future connection conditions with the right amount of implementation detail -->
- QA 3回目: 100点。各検証に確認手段が紐づき、`失敗したら何を返すか` も明確で、実施漏れリスクが十分低い <!-- QA round 3: 100 points. Each verification item is tied to a validation method, and it is clear what to return when things fail, reducing omission risk sufficiently -->
- PM 3回目: 100点。今回の投資の範囲と将来への布石が両立しており、無料制約の中で最も合理的 <!-- PM round 3: 100 points. The scope of the current investment and the setup for future work are both clear, making this the most rational plan under the free-only constraint -->

- 最終合意: 100点。本セッションは `Astro 6 系への更新` を完了させるための技術更新セッションであり、成果物は `更新完了 + 回帰確認 + 将来の /info/ 接続条件の明文化` とする <!-- Final agreement: 100 points. This session is a technical upgrade session focused on completing the move to the `Astro 6` line, with deliverables defined as `completed upgrade + regression verification + documented future /info/ connection conditions` -->

## 実装方針 <!-- Implementation approach -->

- 更新対象は `astro/package.json`、`astro/package-lock.json`、`astro/astro.config.mjs`、および `Astro 6` 非互換が出た場合の `astro/src/**` に限定する <!-- Limit update targets to `astro/package.json`, `astro/package-lock.json`, `astro/astro.config.mjs`, and `astro/src/**` only where `Astro 6` incompatibilities appear -->
- 実装順序は `依存確認 -> 設定更新 -> ページ互換修正 -> build/preview 検証 -> 残課題整理` を厳守する <!-- Strictly follow the execution order `dependency audit -> config updates -> page compatibility fixes -> build/preview verification -> residual issue summary` -->
- 見た目や導線は維持を優先し、`Astro 6` 対応に不要な UI 変更は入れない <!-- Prioritize preserving visuals and navigation, and avoid UI changes that are unnecessary for `Astro 6` compatibility -->
- 将来の `/info/` へ向けて、共通レイアウト、head 設定、ページ構造が content collection 追加に耐えることだけを確認する <!-- For future `/info/`, only verify that the shared layout, head configuration, and page structure can later support adding content collections -->
- 無料運用を崩す要件が判明した場合は、その時点で実装を止めて制約差分を報告する <!-- If any requirement is discovered that breaks the free operating model, stop implementation immediately and report the constraint gap -->

## 停止条件 <!-- Stop conditions -->

- `Astro 6` で必須となる構成が無料運用では成立しない <!-- A required `Astro 6` setup cannot be satisfied under free operation -->
- 既存4ページのいずれかで、軽微修正では吸収できない表示・導線の破壊が発生する <!-- Any of the existing four pages suffers rendering or navigation breakage that cannot be absorbed with a small compatibility fix -->
- `npm run build` が通らず、原因が依存更新だけではなく構成見直し級に広がる <!-- `npm run build` fails and the cause expands beyond a dependency update into a broader structural change -->

## Work Items <!-- Work Items -->

- [ ] `astro/package.json` と `astro/package-lock.json` を確認し、`Astro 6 系` へ上げる依存更新範囲を確定する <!-- Inspect `astro/package.json` and `astro/package-lock.json` and finalize the dependency update scope needed for the `Astro 6` line -->
- [ ] `astro/astro.config.mjs` と Tailwind 連携設定を確認し、`Astro 6` 互換の差分だけを適用する <!-- Inspect `astro/astro.config.mjs` and Tailwind integration settings and apply only the differences required for `Astro 6` compatibility -->
- [ ] `astro/src/pages/**`、`astro/src/layouts/**`、`astro/src/components/**` のうち `Astro 6` 非互換が出た箇所だけを修正する <!-- Modify only the files under `astro/src/pages/**`, `astro/src/layouts/**`, and `astro/src/components/**` that show `Astro 6` incompatibilities -->
- [ ] `astro/` で build を実行し、必要に応じて preview 相当の確認で表示・導線の退行を洗う <!-- Run the build in `astro/` and, if needed, use preview-equivalent checks to inspect rendering and navigation regressions -->
- [ ] 更新後の残留課題、停止条件に触れなかった理由、将来 `/info/` を content collection で足すための前提を整理する <!-- Summarize post-upgrade residual issues, why stop conditions were not triggered, and the prerequisites for later adding `/info/` via content collections -->

## 検証チェックリスト <!-- Verification checklist -->

- [ ] `npm run build` が成功する
確認方法: `astro/` で build コマンドを実行し、終了コード 0 を確認する <!-- Verify `npm run build` succeeds. Method: execute the build command in `astro/` and confirm exit code 0 -->
- [ ] トップページの主要テキスト、ロゴ、背景画像が維持される
確認方法: preview 相当の表示確認または生成物確認で、レイアウト崩れと画像欠落がないことを見る <!-- Verify the home page preserves key text, logo, and background image. Method: use preview-equivalent inspection or built output inspection to confirm no layout breakage or missing images -->
- [ ] FAQ ページの開閉挙動が維持される
確認方法: preview 相当で FAQ の開閉を実際に確認する <!-- Verify the FAQ page keeps its toggle behavior. Method: confirm the FAQ expand/collapse interaction in preview-equivalent runtime -->
- [ ] プライバシーページの本文構造とリンクが維持される
確認方法: 生成 HTML または preview 表示で本文とリンク先を確認する <!-- Verify the privacy page preserves body structure and links. Method: inspect rendered HTML or preview output -->
- [ ] フォームページの転送導線が維持される
確認方法: preview 相当で転送先 URL と遷移ロジックを確認する <!-- Verify the form page preserves redirect flow. Method: inspect runtime behavior and destination URL in preview-equivalent execution -->
- [ ] favicon、主要画像、title、description、OG 設定が破綻しない
確認方法: head 出力と画像参照を確認し、404 やメタ欠落がないことを見る <!-- Verify favicons, key images, title, description, and OG metadata remain intact. Method: inspect head output and asset references for missing metadata or 404s -->

## Out of Scope <!-- Out of Scope -->

- EmDash 本体の導入 <!-- Introduction of EmDash itself -->
- `/info/` ブログ機能の実装 <!-- Implementation of the `/info/` blog feature -->
- Cloudflare の有料機能を前提にした plugin / sandbox 構成 <!-- Plugin / sandbox setup that depends on paid Cloudflare features -->
- 既存静的サイト本体の変更、置換、公開導線変更 <!-- Any change, replacement, or delivery-path modification of the existing static site -->
- `Astro 6` 対応に不要なデザイン刷新や情報設計変更 <!-- Any redesign or information architecture change not required for `Astro 6` compatibility -->
