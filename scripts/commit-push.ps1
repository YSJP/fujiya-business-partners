param(
  [string]$PublicRepoPath = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path,
  [string]$PrivateRepoPath = "C:\Users\TFG152\Documents\Git\fujiya-business-partners-ops",
  [string]$PrivateCommitMessage = "🧹chore: ops文書を更新",
  [string]$PublicCommitMessage = "🧹chore: 公開サイト更新"
)

$ErrorActionPreference = 'Stop'

function Assert-GitRepo([string]$Path) {
  $resolved = (Resolve-Path $Path).Path
  $gitDir = Join-Path $resolved '.git'
  if (-not (Test-Path $gitDir)) {
    throw "Git repository not found: $resolved"
  }
  return $resolved
}

function Get-Dirty([string]$RepoPath) {
  $status = git -C $RepoPath status --porcelain
  return -not [string]::IsNullOrWhiteSpace(($status -join "`n"))
}

function Commit-And-Push([string]$RepoPath, [string]$Message) {
  if (-not (Get-Dirty $RepoPath)) {
    Write-Host "No changes in $RepoPath. Skip commit/push."
    return
  }

  git -C $RepoPath add -A

  if (-not (Get-Dirty $RepoPath)) {
    Write-Host "No staged changes in $RepoPath after add. Skip commit/push."
    return
  }

  git -C $RepoPath commit -m $Message
  git -C $RepoPath push
}

$public = Assert-GitRepo -Path $PublicRepoPath
$private = Assert-GitRepo -Path $PrivateRepoPath

$publicOpsTracked = git -C $public ls-files | Select-String -Pattern '^ops/' -SimpleMatch:$false
if ($publicOpsTracked) {
  throw "Public repo must not track ops/. Remove tracked ops files before push."
}

Commit-And-Push -RepoPath $private -Message $PrivateCommitMessage
Commit-And-Push -RepoPath $public -Message $PublicCommitMessage

Write-Host 'Done: private then public commit/push flow finished.'
