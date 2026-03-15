# Astro 本番切替チェックリスト

## 切替前

- [ ] Pages deploy 成功
- [ ] 見た目確認完了
- [ ] 監視担当者を確認
- [ ] ロールバック担当者を確認
- [ ] 旧本番情報を記録

## 切替時

- [ ] `fujiya-bp.com` の向き先を Astro 本番へ変更
- [ ] Custom Domain を確認
- [ ] Cloudflare キャッシュを purge

## 切替直後

- [ ] `/` を確認
- [ ] `/faq/` を確認
- [ ] `/privacy/` を確認
- [ ] `/form/` を確認
- [ ] mobile を確認
- [ ] 切替完了時刻を記録
