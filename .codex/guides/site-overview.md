# Site Overview

この文書は Fujiya Business Partners サイトの構成と運用前提を把握するための project-local 恒久文書です。Git 管理対象にする一方、公開サイトの閲覧者へ配信しないため `.codex/guides/` 配下に置きます。

## 配置方針

- 公開対象の Astro プロジェクトは `astro/` 配下です。
- Cloudflare Pages では `Root directory: astro`、`Build command: npm run build`、`Build output directory: dist` を前提にします。
- `.codex/guides/` は Astro の `public/`、`src/pages/`、build output のいずれにも含めない運用文書置き場です。
- ルート直下の `index.html`、`faq/`、`form/`、`privacy/` は既存静的サイトの資産です。Astro 側の更新では原則として直接変更しません。

## サイト概要

- サイト名: Fujiya Business Partners 株式会社
- 公開 URL 前提: `https://fujiya-bp.com`
- 目的: 長野市を拠点とする独立系ビジネス支援会社の会社概要、FAQ、問い合わせ導線、プライバシーポリシーを公開する小規模コーポレートサイト
- 運用制約: 無料運用を前提とし、有料 Cloudflare 機能や外部 CMS への依存を持たせない

## Astro 構成

- `astro/package.json`: Astro 6 系、Tailwind integration、基本 scripts を定義します。
- `astro/astro.config.mjs`: `site: "https://fujiya-bp.com"` と Tailwind integration を定義します。
- `astro/src/pages/`: 公開ページを置きます。
- `astro/src/layouts/SiteLayout.astro`: 全ページ共通の HTML 骨格、ナビ、ロゴ、footer、背景画像、共通 CSS 読み込みを担います。
- `astro/src/components/SeoHead.astro`: title、description、keywords、OGP、favicon、robots など head 要素を集約します。
- `astro/src/components/NavMenu.astro`: 4 ページへの fullscreen menu と active state を担います。
- `astro/src/components/Logo.astro`: site logo へのリンクを担います。
- `astro/src/components/SiteFooter.astro`: footer の privacy link と copyright を担います。
- `astro/src/styles/global.css`: Astro 側の共通スタイルです。
- `astro/public/`: 生成後にそのまま配信される CSS、画像、favicon を置きます。

## 公開ページ

- `/`: 会社概要。会社名、代表者、所在地、問い合わせ導線、設立、資本金、事業内容、取引先銀行を掲載します。
- `/faq/`: よくあるご質問。FAQ item の開閉と `#faq-...` hash 指定時の自動展開を inline script で処理します。
- `/form/`: 問い合わせフォーム導線。1.4 秒後に Google Form へ redirect し、query string があれば引き継ぎます。
- `/privacy/`: プライバシーポリシー。個人情報、Cookie、第三者非開示、問い合わせ、著作権、改訂方針を掲載します。

## 既存静的サイトとの関係

この repo には、Astro 版とは別に既存静的サイトの HTML/CSS/JS/画像がルート直下にも残っています。Astro 版は `astro/` 配下の独立プロジェクトとして扱い、Cloudflare Pages の root directory を `astro` にすることで、ルート直下の Codex 文書や既存静的資産を Astro build output に含めない構成です。

既存静的サイトを変更する必要がある場合は、Astro 版の変更と混ぜず、目的と公開経路を分けて扱います。

## 変更時の確認観点

- `npm run build` が `astro/` 配下で成功すること。
- 4 ページの URL、ナビ、ロゴ link、footer link が維持されること。
- FAQ の click 開閉と hash 指定の自動展開が動くこと。
- `/form/` の redirect 先と query string 引き継ぎが維持されること。
- `SeoHead.astro` の canonical / OGP / favicon / robots が意図した値で出力されること。
- `astro/public/` の画像・CSS 参照が build output で欠落しないこと。

## 公開対象外文書

`.codex/` 配下は Codex 運用文書の置き場です。サイト閲覧者に見せるページ、画像、CSS、JS はここへ置かず、公開が必要なものだけ `astro/src/pages/` または `astro/public/` に置きます。
