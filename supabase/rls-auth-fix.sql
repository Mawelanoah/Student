-- Student Marketplace – Auth / Admin RLS fix
-- Run in Supabase SQL Editor. Safe to re-run (uses drop policy if exists patterns).

-- Helper: avoid recursive RLS when checking admin role
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
      and role = 'admin'
      and coalesce(is_suspended, false) = false
  );
$$;

create or replace function public.is_seller()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
      and role = 'seller'
      and coalesce(is_suspended, false) = false
  );
$$;

-- Ensure admin can read all profiles (for stats / user management)
drop policy if exists "Admins read all profiles" on public.profiles;
create policy "Admins read all profiles"
  on public.profiles for select
  using (public.is_admin() or auth.uid() = id);

-- Prevent non-admins from changing role / suspension via client
-- Users may update own non-role fields; admins may update any profile
drop policy if exists "Users update own profile" on public.profiles;
drop policy if exists "Admins update profiles" on public.profiles;
create policy "Users update own profile non-role"
  on public.profiles for update
  using (auth.uid() = id)
  with check (
    auth.uid() = id
    and role = (select p.role from public.profiles p where p.id = auth.uid())
  );

-- Simpler: allow update own row; block role escalation with trigger below
drop policy if exists "Users update own profile non-role" on public.profiles;
create policy "Users update own profile"
  on public.profiles for update
  using (auth.uid() = id or public.is_admin())
  with check (auth.uid() = id or public.is_admin());

-- Block self-promotion to admin/seller unless already that role or is admin
create or replace function public.protect_profile_role()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'UPDATE' and new.role is distinct from old.role then
    if not public.is_admin() then
      raise exception 'Only administrators can change roles';
    end if;
  end if;
  if tg_op = 'UPDATE' and new.is_suspended is distinct from old.is_suspended then
    if not public.is_admin() then
      raise exception 'Only administrators can suspend accounts';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_protect_profile_role on public.profiles;
create trigger trg_protect_profile_role
  before update on public.profiles
  for each row execute procedure public.protect_profile_role();

-- Seller applications: applicants read/insert own; admins manage all
drop policy if exists "Users insert own seller application" on public.seller_applications;
drop policy if exists "Users read own seller application" on public.seller_applications;
drop policy if exists "Admins manage seller applications" on public.seller_applications;

create policy "Users insert own seller application"
  on public.seller_applications for insert
  with check (auth.uid() = user_id);

create policy "Users read own seller application"
  on public.seller_applications for select
  using (auth.uid() = user_id or public.is_admin());

create policy "Admins update seller applications"
  on public.seller_applications for update
  using (public.is_admin());

-- Secure approve/reject function (preferred path from admin dashboard)
create or replace function public.admin_review_seller_application(
  application_id uuid,
  new_status text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  app record;
begin
  if not public.is_admin() then
    raise exception 'Not authorized';
  end if;
  if new_status not in ('approved', 'rejected') then
    raise exception 'Invalid status';
  end if;
  select * into app from public.seller_applications where id = application_id for update;
  if not found then
    raise exception 'Application not found';
  end if;
  update public.seller_applications
    set status = new_status,
        reviewed_at = now(),
        reviewed_by = auth.uid()
    where id = application_id;
  if new_status = 'approved' and app.user_id is not null then
    update public.profiles
      set role = 'seller',
          is_verified = true
      where id = app.user_id;
  end if;
end;
$$;

grant execute on function public.admin_review_seller_application(uuid, text) to authenticated;
grant execute on function public.is_admin() to authenticated;
grant execute on function public.is_seller() to authenticated;

-- Confirm your admin role (run once with YOUR email):
-- update public.profiles set role = 'admin', is_verified = true where email = 'mawelanoah194@gmail.com';
