$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$sourceRoot = Join-Path $projectRoot 'data\sources'
$sources = @(
  @{ Id = 'porbr2018'; Url = 'https://ebible.org/Scriptures/porbr2018_vpl.zip' },
  @{ Id = 'porbrbsl'; Url = 'https://ebible.org/Scriptures/porbrbsl_vpl.zip' },
  @{ Id = 'portft'; Url = 'https://ebible.org/Scriptures/portft_vpl.zip' },
  @{ Id = 'poronbv'; Url = 'https://ebible.org/Scriptures/poronbv_vpl.zip' },
  @{ Id = 'porblt'; Url = 'https://ebible.org/Scriptures/porblt_vpl.zip' }
)

New-Item -ItemType Directory -Force -Path $sourceRoot | Out-Null
$almeidaRoot = Join-Path $sourceRoot 'almeida1911'
New-Item -ItemType Directory -Force -Path $almeidaRoot | Out-Null
Invoke-WebRequest -Uri 'https://raw.githubusercontent.com/BibliaJFAAL/JFAAL/main/original/1911-JFAAtualizada.json' -OutFile (Join-Path $almeidaRoot 'original.json')
foreach ($source in $sources) {
  $archive = Join-Path $sourceRoot "$($source.Id).zip"
  $destination = Join-Path $sourceRoot $source.Id
  Invoke-WebRequest -Uri $source.Url -OutFile $archive
  Expand-Archive -LiteralPath $archive -DestinationPath $destination -Force
  Write-Host "Fonte $($source.Id) atualizada."
}
