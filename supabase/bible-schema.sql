create table if not exists public.bible_versions (
  id text primary key,
  abbreviation text not null,
  name text not null,
  language text not null default 'pt-BR',
  completeness text not null,
  license text not null,
  license_url text not null,
  source_url text not null,
  attribution text not null,
  package_path text not null,
  package_bytes bigint not null,
  package_sha256 text not null,
  verse_count integer not null,
  book_count integer not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.bible_verses (
  version_id text not null references public.bible_versions(id) on delete cascade,
  book_code text not null,
  book_name text not null,
  book_order smallint not null,
  chapter smallint not null,
  verse_start smallint not null,
  verse_end smallint not null,
  verse_text text not null,
  search_vector tsvector generated always as (to_tsvector('portuguese', verse_text)) stored,
  primary key (version_id,book_code,chapter,verse_start,verse_end)
);

create index if not exists bible_verses_reference_idx on public.bible_verses(version_id,book_order,chapter,verse_start);
create index if not exists bible_verses_search_idx on public.bible_verses using gin(search_vector);

create table if not exists public.user_bible_versions (
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  version_id text not null references public.bible_versions(id) on delete cascade,
  installed_at timestamptz not null default now(),
  last_opened_at timestamptz,
  primary key (tenant_id,user_id,version_id)
);

alter table public.bible_versions enable row level security;
alter table public.bible_verses enable row level security;
alter table public.user_bible_versions enable row level security;

drop policy if exists "active bible versions public read" on public.bible_versions;
drop policy if exists "active bible verses public read" on public.bible_verses;
drop policy if exists "installed bibles own" on public.user_bible_versions;

create policy "active bible versions public read" on public.bible_versions for select using (is_active);
create policy "active bible verses public read" on public.bible_verses for select using (
  exists(select 1 from public.bible_versions version where version.id=version_id and version.is_active)
);
create policy "installed bibles own" on public.user_bible_versions for all
using (public.is_tenant_member(tenant_id) and user_id=auth.uid())
with check (public.is_tenant_member(tenant_id) and user_id=auth.uid());
