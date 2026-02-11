# AGENTS.md

## 指示の優先順位

- User > System/Developer > AGENTS.md > 慣習

## 承認ゲート（必須）

- Codex は、実装・ファイル編集・commit・push を実行する前に、必ず User（あなた）の明示承認を取得すること。
- 明示承認を得るまでは、提案・調査・差分予定の提示までに留め、実行しないこと。
- 実行承認と commit/push 承認は分離し、commit/push は都度承認を得ること。
- commit/push の実行許可を求める際は、常に `C:\Users/TFG152/.codex/guides/repo.md` に準拠したコミットメッセージ案を提示すること。
- コミットメッセージ案は、`絵文字 + Prefix（英語ラベル）: 本文` の形式を守り、本文は日本語で記述すること。
