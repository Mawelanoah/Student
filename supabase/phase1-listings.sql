-- Phase 1 listings: availability fields + seller publish RLS
-- Run in Supabase SQL Editor

-- Product availability columns
alter table public.products add column if not exists stock_status text default 'in_stock';
alter table public.products add column if not exists prep_days int default 0;
alter table public.products add column if not exists delivery_days int default 0;

-- Ensure product_images exists
create table if not exists public.product_images (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references public.products(id) on delete cascade,
  url text not null,
  sort_order int default 0,
  created_at timestamptz default now()
);

alter table public.product_images enable row level security;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin' and coalesce(is_suspended,false)=false
  );
$$;

create or replace function public.is_seller()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'seller' and coalesce(is_suspended,false)=false
  );
$$;

alter table public.products enable row level security;

drop policy if exists "Public read active products" on public.products;
drop policy if exists "Sellers insert products" on public.products;
drop policy if exists "Sellers update own products" on public.products;
drop policy if exists "Sellers delete own products" on public.products;

create policy "Public read active products"
  on public.products for select
  using (status = 'active' or seller_id = auth.uid() or public.is_admin());

create policy "Sellers insert products"
  on public.products for insert
  with check (
    seller_id = auth.uid()
    and (public.is_seller() or public.is_admin())
  );

create policy "Sellers update own products"
  on public.products for update
  using (seller_id = auth.uid() or public.is_admin());

create policy "Sellers delete own products"
  on public.products for delete
  using (seller_id = auth.uid() or public.is_admin());

drop policy if exists "Read product images" on public.product_images;
drop policy if exists "Sellers insert product images" on public.product_images;

create policy "Read product images"
  on public.product_images for select using (true);

create policy "Sellers insert product images"
  on public.product_images for insert
  with check (
    exists (
      select 1 from public.products p
      where p.id = product_id and p.seller_id = auth.uid()
    )
    or public.is_admin()
  );

-- Services RLS (table may already exist)
do $$ begin
  alter table public.services enable row level security;
exception when undefined_table then null;
end $$;

drop policy if exists "Public read active services" on public.services;
drop policy if exists "Sellers insert services" on public.services;
drop policy if exists "Sellers update own services" on public.services;

do $$ begin
  create policy "Public read active services"
    on public.services for select
    using (status = 'active' or seller_id = auth.uid() or public.is_admin());
exception when undefined_table then null;
end $$;

do $$ begin
  create policy "Sellers insert services"
    on public.services for insert
    with check (seller_id = auth.uid() and (public.is_seller() or public.is_admin()));
exception when undefined_table then null;
end $$;

do $$ begin
  create policy "Sellers update own services"
    on public.services for update
    using (seller_id = auth.uid() or public.is_admin());
exception when undefined_table then null;
end $$;

grant execute on function public.is_admin() to authenticated;
grant execute on function public.is_seller() to authenticated;
