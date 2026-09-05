$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$port = 8080

$listener = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
if ($listener) {
  exit 0
}

Set-Location -LiteralPath $projectRoot
& node (Join-Path $projectRoot 'server.mjs')
