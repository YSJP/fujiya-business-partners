# AGENTS.md

## 指示の優先順位

- User > System/Developer > AGENTS.md > 慣習

## commit/push 運用

- User が「commit」「push」「commit push」を指示した場合、Codex はまず `ops/` を private リポジトリとして確認し、変更があれば `ops` 側を先に commit/push すること。
- `ops/` の push 先は `YSJP/fujiya-business-partners-ops`（private）とすること。
- 次に、公開サイト本体（`ops/` 以外）の変更があれば `YSJP/fujiya-business-partners`（public）へ commit/push すること。
- `scripts/commit-push.ps1` は運用に使用しないこと。
