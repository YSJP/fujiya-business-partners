# Astro 本番切替のロールバック手順

## 目的

Astro 本番切替後に重大問題が見つかった場合、旧構成へ短時間で戻す。

## 前提

- 旧本番は切替後も削除しない
- 旧本番の配信先と切替前コミットは private 記録に保持している
- `fujiya-bp.com` の向き先は Cloudflare 上で切替可能

## 保持すべき情報

- 切替前コミット SHA
- 切替前の配信先の private 参照先
- Cloudflare Pages 側の Astro 本番設定の private 参照先
- 旧本番へ戻す操作手順の private 参照先
- 実施責任者ロール

## 公開リポジトリで扱わない情報

- 配信先 URL の詳細
- Cloudflare 管理画面の直接 URL
- 担当者の個人名や個別連絡先
- 内部チケット URL

## ロールバック発動条件

- Home のファーストビューが崩れる
- FAQ の開閉が壊れる
- Form の転送が失敗する
- Privacy の可読性が著しく落ちる
- 404 / 500 が主要導線で発生する
- スマホ表示で重大な崩れがある

## 手順

1. 障害の再現を確認する
2. 影響ページと影響範囲を記録する
3. `fujiya-bp.com` の向き先を Astro 本番から旧本番へ戻す
4. Cloudflare キャッシュを purge する
5. `/`, `/faq/`, `/privacy/`, `/form/` を確認する
6. mobile 表示を確認する
7. 復旧完了時刻を記録する

## Cloudflare で確認する項目

- Custom Domain の向き先
- Pages deploy の状態
- DNS 変更有無
- Cache purge 実施有無

## 復旧確認チェック

- [ ] Home が旧本番表示に戻った
- [ ] FAQ が動作する
- [ ] Privacy が読める
- [ ] Form が遷移する
- [ ] スマホで崩れていない

## ロールバック後の整理

- 原因を private issue 化する
- 再切替の条件を明文化する
- 監視を再開する
