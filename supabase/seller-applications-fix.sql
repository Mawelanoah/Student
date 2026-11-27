-- Seller applications + admin approve (run in Supabase SQL Editor)

-- Ensure notes column exists (for description / institution text)
do $$ begin
  alter table public.seller_applications add column if not exists notes text;
exception when others then null;
end $$;

-- Helpers
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

-- RLS on seller_applications
alter table public.seller_applications enable row level security;

drop policy if exists "Users insert own seller application" on public.seller_applications;
drop policy if exists "Users read own seller application" on public.seller_applications;
drop policy if exists "Admins update seller applications" on public.seller_applications;
drop policy if exists "Admins manage seller applications" on public.seller_applications;
drop policy if exists "Admins read seller applications" on public.seller_applications;

create policy "Users insert own seller application"
  on public.seller_applications for insert
  with check (auth.uid() = user_id);

create policy "Users read own seller application"
  on public.seller_applications for select
  using (auth.uid() = user_id or public.is_admin());

create policy "Admins update seller applications"
  on public.seller_applications for update
  using (public.is_admin());

-- Profiles: users update own; admins update any; role change protected by trigger
alter table public.profiles enable row level security;

drop policy if exists "Public profiles readable" on public.profiles;
drop policy if exists "Admins read all profiles" on public.profiles;
drop policy if exists "Users update own profile" on public.profiles;

create policy "Profiles select own or admin"
  on public.profiles for select
  using (auth.uid() = id or public.is_admin());

-- Optional: public can still see limited seller info later; for now own+admin is safer for counts
-- If homepage needs public names, add a separate public view later.

create policy "Users update own or admin"
  on public.profiles for update
  using (auth.uid() = id or public.is_admin())
  with check (auth.uid() = id or public.is_admin());

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

-- Approve / reject RPC
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

grant execute on function public.is_admin() to authenticated;
grant execute on function public.admin_review_seller_application(uuid, text) to authenticated;

-- One pending application per user (optional unique index via partial unique)
create unique index if not exists seller_applications_one_pending
  on public.seller_applications (user_id)
  where (status = 'pending');

-- Confirm admin (adjust email if needed)
-- update public.profiles set role = 'admin', is_verified = true where email = 'mawelanoah194@gmail.com';
