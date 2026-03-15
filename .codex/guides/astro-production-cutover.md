# Astro 本番切替ガイド

## 目的

`fujiya-bp.com` を既存構成から Astro 本番へ安全に切り替える。

## 事前条件

- Astro preview の見た目確認が完了している
- `npm run build` が通っている
- Cloudflare Pages の最新 deploy が成功している
- 監視項目とロールバック手順が共有済み
- 旧本番の保持先を記録している

## 切替前チェック

- [ ] Home / FAQ / Privacy / Form の見た目確認
- [ ] mobile の見た目確認
- [ ] ハンバーガーメニュー確認
- [ ] FAQ 開閉確認
- [ ] Form 転送確認
- [ ] ロールバック責任者を確認

## 手順

1. Cloudflare Pages の最新 production deploy を確認する
2. `fujiya-bp.com` の向き先を旧本番から Astro 本番へ切り替える
3. 必要に応じて Custom Domain の設定を更新する
4. Cloudflare キャッシュを purge する
5. `fujiya-bp.com` で `/`, `/faq/`, `/privacy/`, `/form/` を確認する
6. desktop / mobile の見た目を確認する
7. 切替完了時刻を記録する

## 切替直後に確認する項目

- Home のファーストビュー
- FAQ card の見た目
- Privacy の長文表示
- Form の外部遷移
- underline
- footer 位置
- favicon

## 切替後の運用

- 監視ガイドに沿って 7 日間重点監視する
- 問題があればロールバック手順を優先する
