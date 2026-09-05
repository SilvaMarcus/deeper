insert into auth.users (email, encrypted_password, raw_user_meta_data)
values (
  'admin',
  crypt('admin', gen_salt('bf')),
  '{"full_name":"Administrador"}'::jsonb
)
on conflict (email) do update
set encrypted_password = excluded.encrypted_password,
    raw_user_meta_data = excluded.raw_user_meta_data;

update public.tenant_members tm
set role = 'admin'
from auth.users u
where tm.user_id = u.id
  and u.email = 'admin';
