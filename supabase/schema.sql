-- Deeper: estrutura inicial SaaS multi-tenant para Supabase/PostgreSQL.
-- Execute em um projeto de desenvolvimento e revise as políticas antes de produção.

create extension if not exists pgcrypto;

create type public.tenant_role as enum ('owner','member','content_editor','admin');
create type public.subscription_status as enum ('manual','trial','active','past_due','suspended','cancelled','expired');
create type public.content_kind as enum ('article','course','devotional','kids_story');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  locale text not null default 'pt-BR',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.tenants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique,
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now()
);

create table public.tenant_members (
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.tenant_role not null default 'member',
  created_at timestamptz not null default now(),
  primary key (tenant_id,user_id)
);

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  status public.subscription_status not null default 'manual',
  plan_code text not null default 'individual',
  provider text,
  provider_customer_id text,
  provider_subscription_id text,
  starts_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.user_preferences (
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  theme text not null default 'system',
  bible_language text not null default 'pt',
  installed_version_ids text[] not null default '{}',
  settings jsonb not null default '{}',
  updated_at timestamptz not null default now(),
  primary key (tenant_id,user_id)
);

create table public.reading_plans (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  method text not null check (method in ('canonical','chronological','genres','stories')),
  scope text not null check (scope in ('all','OT','NT')),
  bible_version_id text not null,
  checklist_unit text not null check (checklist_unit in ('chapter','story','block')),
  starts_on date not null,
  target_days integer not null check (target_days > 0),
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.reading_plan_days (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  plan_id uuid not null references public.reading_plans(id) on delete cascade,
  day_number integer not null,
  scheduled_for date not null,
  reading_label text not null,
  items jsonb not null,
  total_items integer not null,
  completed_items integer not null default 0,
  completed_at timestamptz,
  unique(plan_id,day_number)
);

create table public.reading_progress (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  plan_id uuid references public.reading_plans(id) on delete cascade,
  book_code text not null,
  chapter integer not null,
  completed_at timestamptz not null default now(),
  source text not null default 'app',
  unique(tenant_id,user_id,plan_id,book_code,chapter)
);

create table public.notebooks (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  category text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.notes (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  notebook_id uuid references public.notebooks(id) on delete set null,
  title text not null,
  body text not null default '',
  bible_version_id text,
  book_code text,
  chapter integer,
  verse_start integer,
  verse_end integer,
  tags text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table public.verse_highlights (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  bible_version_id text not null,
  book_code text not null,
  chapter integer not null,
  verse integer not null,
  color text not null,
  comment varchar(220),
  is_favorite boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(tenant_id,user_id,bible_version_id,book_code,chapter,verse)
);

create table public.sermon_messages (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  theme text,
  main_reference text,
  introduction text,
  points jsonb not null default '[]',
  support_verses jsonb not null default '[]',
  application text,
  conclusion text,
  status text not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.devotional_entries (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  topic text,
  bible_reference text,
  reflection text,
  application text,
  prayer text,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.kids_progress (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  story_id text not null,
  learned_text text,
  completed_at timestamptz,
  unique(tenant_id,user_id,story_id)
);

create table public.editorial_content (
  id uuid primary key default gen_random_uuid(),
  kind public.content_kind not null,
  locale text not null default 'pt-BR',
  slug text not null,
  title text not null,
  summary text,
  cover_url text,
  content jsonb not null default '{}',
  status text not null default 'draft',
  created_by uuid references auth.users(id),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(kind,locale,slug)
);

create index reading_plan_days_plan_date_idx on public.reading_plan_days(plan_id,scheduled_for);
create index reading_progress_tenant_user_idx on public.reading_progress(tenant_id,user_id,completed_at desc);
create index notes_tenant_user_updated_idx on public.notes(tenant_id,user_id,updated_at desc) where deleted_at is null;
create index highlights_tenant_reference_idx on public.verse_highlights(tenant_id,user_id,bible_version_id,book_code,chapter);
create index editorial_content_publish_idx on public.editorial_content(kind,locale,published_at desc) where status='published';

-- Função reutilizada pelas políticas: o usuário só acessa tenants dos quais é membro.
create or replace function public.is_tenant_member(target_tenant uuid)
returns boolean language sql stable security definer set search_path=public as $$
  select exists(select 1 from public.tenant_members tm where tm.tenant_id=target_tenant and tm.user_id=auth.uid());
$$;

alter table public.profiles enable row level security;
alter table public.tenants enable row level security;
alter table public.tenant_members enable row level security;
alter table public.subscriptions enable row level security;
alter table public.user_preferences enable row level security;
alter table public.reading_plans enable row level security;
alter table public.reading_plan_days enable row level security;
alter table public.reading_progress enable row level security;
alter table public.notebooks enable row level security;
alter table public.notes enable row level security;
alter table public.verse_highlights enable row level security;
alter table public.sermon_messages enable row level security;
alter table public.devotional_entries enable row level security;
alter table public.kids_progress enable row level security;
alter table public.editorial_content enable row level security;

create policy "profile owner" on public.profiles for all using (id=auth.uid()) with check (id=auth.uid());
create policy "tenant members read tenant" on public.tenants for select using (public.is_tenant_member(id));
create policy "members read memberships" on public.tenant_members for select using (public.is_tenant_member(tenant_id));

-- Política padrão para tabelas privadas. Repete-se de modo explícito para facilitar auditoria.
create policy "subscriptions tenant read" on public.subscriptions for select using (public.is_tenant_member(tenant_id));
create policy "preferences own" on public.user_preferences for all using (public.is_tenant_member(tenant_id) and user_id=auth.uid()) with check (public.is_tenant_member(tenant_id) and user_id=auth.uid());
create policy "plans own" on public.reading_plans for all using (public.is_tenant_member(tenant_id) and user_id=auth.uid()) with check (public.is_tenant_member(tenant_id) and user_id=auth.uid());
create policy "plan days own tenant" on public.reading_plan_days for all using (public.is_tenant_member(tenant_id)) with check (public.is_tenant_member(tenant_id));
create policy "progress own" on public.reading_progress for all using (public.is_tenant_member(tenant_id) and user_id=auth.uid()) with check (public.is_tenant_member(tenant_id) and user_id=auth.uid());
create policy "notebooks own" on public.notebooks for all using (public.is_tenant_member(tenant_id) and user_id=auth.uid()) with check (public.is_tenant_member(tenant_id) and user_id=auth.uid());
create policy "notes own" on public.notes for all using (public.is_tenant_member(tenant_id) and user_id=auth.uid()) with check (public.is_tenant_member(tenant_id) and user_id=auth.uid());
create policy "highlights own" on public.verse_highlights for all using (public.is_tenant_member(tenant_id) and user_id=auth.uid()) with check (public.is_tenant_member(tenant_id) and user_id=auth.uid());
create policy "messages own" on public.sermon_messages for all using (public.is_tenant_member(tenant_id) and user_id=auth.uid()) with check (public.is_tenant_member(tenant_id) and user_id=auth.uid());
create policy "devotionals own" on public.devotional_entries for all using (public.is_tenant_member(tenant_id) and user_id=auth.uid()) with check (public.is_tenant_member(tenant_id) and user_id=auth.uid());
create policy "kids progress own" on public.kids_progress for all using (public.is_tenant_member(tenant_id) and user_id=auth.uid()) with check (public.is_tenant_member(tenant_id) and user_id=auth.uid());
create policy "published editorial public" on public.editorial_content for select using (status='published');

-- Cria perfil, tenant individual, vínculo e assinatura manual no primeiro cadastro.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path=public as $$
declare new_tenant uuid;
begin
  insert into public.profiles(id,full_name) values(new.id,coalesce(new.raw_user_meta_data->>'full_name',''));
  insert into public.tenants(name,created_by) values(coalesce(new.raw_user_meta_data->>'full_name','Meu espaço'),new.id) returning id into new_tenant;
  insert into public.tenant_members(tenant_id,user_id,role) values(new_tenant,new.id,'owner');
  insert into public.subscriptions(tenant_id,status,plan_code) values(new_tenant,'manual','individual');
  return new;
end;
$$;

create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();
