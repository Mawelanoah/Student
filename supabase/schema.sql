-- Student Marketplace Supabase Schema
-- Run in SQL Editor. Assign admin only via SQL: update profiles set role='admin' where email='...';

create extension if not exists "uuid-ossp";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'customer' check (role in ('customer','seller','admin')),
  full_name text, email text, whatsapp text,
  institution text default 'TUT', campus text, student_number text,
  avatar_url text, bio text,
  is_verified boolean default false, is_suspended boolean default false,
  created_at timestamptz default now(), updated_at timestamptz default now()
);

create table if not exists public.categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null, slug text unique not null, icon text,
  sort_order int default 0, is_active boolean default true
);

create table if not exists public.service_categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null, slug text unique not null,
  sort_order int default 0, is_active boolean default true
);

create table if not exists public.seller_applications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  full_name text not null, email text not null, whatsapp text not null,
  campus text, student_number text,
  status text default 'pending' check (status in ('pending','approved','rejected')),
  notes text, reviewed_by uuid references public.profiles(id), reviewed_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  seller_id uuid not null references public.profiles(id) on delete cascade,
  name text not null, description text,
  category_id uuid references public.categories(id), brand text,
  condition text check (condition in ('new','used')),
  original_price numeric(12,2), selling_price numeric(12,2) not null,
  stock_qty int default 1,
  status text default 'pending' check (status in ('pending','active','paused','sold','rejected','out_of_stock')),
  location text,
  delivery_available boolean default false, collection_available boolean default true,
  delivery_min_days int, delivery_max_days int, delivery_fee numeric(12,2),
  delivery_areas text, delivery_notes text, is_featured boolean default false,
  created_at timestamptz default now(), updated_at timestamptz default now()
);

create table if not exists public.product_images (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references public.products(id) on delete cascade,
  url text not null, sort_order int default 0
);

create table if not exists public.services (
  id uuid primary key default uuid_generate_v4(),
  seller_id uuid not null references public.profiles(id) on delete cascade,
  name text not null, description text,
  category_id uuid references public.service_categories(id),
  starting_price numeric(12,2) not null, location text,
  working_days text, available_hours text, duration_minutes int default 60, whatsapp text,
  status text default 'pending' check (status in ('pending','active','paused','rejected')),
  created_at timestamptz default now(), updated_at timestamptz default now()
);

create table if not exists public.service_images (
  id uuid primary key default uuid_generate_v4(),
  service_id uuid not null references public.services(id) on delete cascade,
  url text not null, sort_order int default 0
);

create table if not exists public.seller_availability (
  id uuid primary key default uuid_generate_v4(),
  seller_id uuid not null references public.profiles(id) on delete cascade,
  day_of_week int check (day_of_week between 0 and 6),
  start_time time, end_time time, is_blocked boolean default false, blocked_date date
);

create table if not exists public.orders (
  id uuid primary key default uuid_generate_v4(),
  customer_id uuid not null references public.profiles(id),
  seller_id uuid not null references public.profiles(id),
  status text default 'pending' check (status in ('pending','accepted','processing','dispatched','delivered','collected','cancelled')),
  fulfilment text check (fulfilment in ('delivery','collection')),
  delivery_address text, delivery_notes text, total_amount numeric(12,2),
  created_at timestamptz default now(), updated_at timestamptz default now()
);

create table if not exists public.order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id),
  quantity int not null default 1, unit_price numeric(12,2) not null
);

create table if not exists public.bookings (
  id uuid primary key default uuid_generate_v4(),
  service_id uuid not null references public.services(id),
  customer_id uuid not null references public.profiles(id),
  seller_id uuid not null references public.profiles(id),
  booking_date date not null, booking_time time not null,
  status text default 'pending' check (status in ('pending','confirmed','completed','cancelled','rejected')),
  customer_name text, customer_whatsapp text, notes text,
  created_at timestamptz default now(), updated_at timestamptz default now(),
  unique (service_id, booking_date, booking_time)
);

create table if not exists public.reports (
  id uuid primary key default uuid_generate_v4(),
  reporter_id uuid references public.profiles(id),
  product_id uuid references public.products(id),
  service_id uuid references public.services(id),
  reason text, details text,
  status text default 'open' check (status in ('open','reviewed','closed')),
  created_at timestamptz default now()
);

create table if not exists public.notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text, body text, is_read boolean default false, created_at timestamptz default now()
);

create index if not exists idx_products_seller on public.products(seller_id);
create index if not exists idx_products_status on public.products(status);
create index if not exists idx_services_seller on public.services(seller_id);
create index if not exists idx_orders_customer on public.orders(customer_id);
create index if not exists idx_bookings_seller on public.bookings(seller_id);

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name',''), 'customer');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.services enable row level security;
alter table public.orders enable row level security;
alter table public.bookings enable row level security;
alter table public.reports enable row level security;
alter table public.seller_applications enable row level security;
alter table public.product_images enable row level security;
alter table public.service_images enable row level security;
alter table public.notifications enable row level security;
alter table public.seller_availability enable row level security;

create policy "Public profiles readable" on public.profiles for select using (true);
create policy "Users update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Active products public" on public.products for select using (status = 'active' or seller_id = auth.uid());
create policy "Sellers insert products" on public.products for insert with check (seller_id = auth.uid());
create policy "Sellers update own products" on public.products for update using (seller_id = auth.uid());
create policy "Sellers delete own products" on public.products for delete using (seller_id = auth.uid());
create policy "Active services public" on public.services for select using (status = 'active' or seller_id = auth.uid());
create policy "Sellers insert services" on public.services for insert with check (seller_id = auth.uid());
create policy "Sellers update own services" on public.services for update using (seller_id = auth.uid());
create policy "Order participants read" on public.orders for select using (customer_id = auth.uid() or seller_id = auth.uid());
create policy "Customers create orders" on public.orders for insert with check (customer_id = auth.uid());
create policy "Participants update orders" on public.orders for update using (customer_id = auth.uid() or seller_id = auth.uid());
create policy "Booking participants read" on public.bookings for select using (customer_id = auth.uid() or seller_id = auth.uid());
create policy "Customers create bookings" on public.bookings for insert with check (customer_id = auth.uid());
create policy "Participants update bookings" on public.bookings for update using (customer_id = auth.uid() or seller_id = auth.uid());

insert into public.categories (name, slug, sort_order) values
  ('Fashion & Clothing','fashion',1),('Electronics & Gadgets','electronics',2),
  ('Books & Stationery','books',3),('Food & Groceries','food',4),
  ('Beauty & Personal Care','beauty',5),('Home & Accommodation','accommodation',6),
  ('Sports & Fitness','sports',7),('Accessories','accessories',8),('Other','other',9)
on conflict (slug) do nothing;

insert into public.service_categories (name, slug, sort_order) values
  ('Nails and Nail Art','nails',1),('Hair and Braiding','hair',2),('Barbering','barbering',3),
  ('Makeup','makeup',4),('Eyelashes and Brows','lashes',5),('Photography','photography',6),
  ('Sewing and Clothing Alterations','sewing',7),('Tutoring','tutoring',8),
  ('Graphic Design','design',9),('Catering and Baking','catering',10),
  ('Cleaning','cleaning',11),('Other Services','other-services',12)
on conflict (slug) do nothing;
