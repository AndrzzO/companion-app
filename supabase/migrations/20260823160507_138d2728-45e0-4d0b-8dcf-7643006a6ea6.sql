create schema if not exists private;
revoke all on schema private from public;

create or replace function private.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select auth.uid() is not null
     and _user_id = auth.uid()
     and exists (
       select 1 from public.user_roles
       where user_id = _user_id and role = _role
     )
$$;
revoke all on function private.has_role(uuid, public.app_role) from public;
grant usage on schema private to authenticated;
grant execute on function private.has_role(uuid, public.app_role) to authenticated;

drop policy if exists "Admins can manage categories" on public.categories;
drop policy if exists "Allow admin all access to categories" on public.categories;
drop policy if exists "Admins can manage services" on public.services;
drop policy if exists "Allow admin all access to services" on public.services;
drop policy if exists "Admins can manage settings" on public.settings;
drop policy if exists "Allow admin insert settings" on public.settings;
drop policy if exists "Allow admin update settings" on public.settings;
drop policy if exists "Admins can read all roles" on public.user_roles;

create policy "Admins can manage categories" on public.categories for all to authenticated
  using (private.has_role(auth.uid(), 'admin')) with check (private.has_role(auth.uid(), 'admin'));
create policy "Admins can manage services" on public.services for all to authenticated
  using (private.has_role(auth.uid(), 'admin')) with check (private.has_role(auth.uid(), 'admin'));
create policy "Admins can manage settings" on public.settings for all to authenticated
  using (private.has_role(auth.uid(), 'admin')) with check (private.has_role(auth.uid(), 'admin'));
create policy "Admins can read all roles" on public.user_roles for select to authenticated
  using (private.has_role(auth.uid(), 'admin'));

drop function if exists public.has_role(uuid, public.app_role);