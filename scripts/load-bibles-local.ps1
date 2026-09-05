$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$psql = 'C:\Program Files\PostgreSQL\18\bin\psql.exe'
$env:PGPASSWORD = if ($env:PGPASSWORD) { $env:PGPASSWORD } else { 'postgres' }
$database = if ($env:PGDATABASE) { $env:PGDATABASE } else { 'sai_do_razo' }
$user = if ($env:PGUSER) { $env:PGUSER } else { 'postgres' }
$hostName = if ($env:PGHOST) { $env:PGHOST } else { 'localhost' }
$port = if ($env:PGPORT) { $env:PGPORT } else { '5432' }

& $psql -U $user -h $hostName -p $port -d $database -v ON_ERROR_STOP=1 -f (Join-Path $projectRoot 'supabase\bible-schema.sql')

$versions = (Join-Path $projectRoot 'supabase\import\bible-versions.csv').Replace('\', '/')
$verses = (Join-Path $projectRoot 'supabase\import\bible-verses.csv').Replace('\', '/')

& $psql -U $user -h $hostName -p $port -d $database -v ON_ERROR_STOP=1 -c 'truncate table public.bible_verses, public.bible_versions cascade'
& $psql -U $user -h $hostName -p $port -d $database -v ON_ERROR_STOP=1 -c "\copy public.bible_versions(id,abbreviation,name,language,completeness,license,license_url,source_url,attribution,package_path,package_bytes,package_sha256,verse_count,book_count) from '$versions' with (format csv, header true, encoding 'UTF8')"
& $psql -U $user -h $hostName -p $port -d $database -v ON_ERROR_STOP=1 -c "\copy public.bible_verses(version_id,book_code,book_name,book_order,chapter,verse_start,verse_end,verse_text) from '$verses' with (format csv, header true, encoding 'UTF8')"

& $psql -U $user -h $hostName -p $port -d $database -tAc 'select version_id, count(*) from public.bible_verses group by version_id order by version_id'
