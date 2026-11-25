# Student Marketplace – Setup Guide

## 1. GitHub Pages
Deployed at: https://mawelanoah.github.io/Student/

## 2. Supabase (required for real accounts, products, orders, bookings)

1. Create a free project at https://supabase.com
2. Open **SQL Editor** → paste and run `supabase/schema.sql`
3. Enable **Authentication** → Email provider
4. Create Storage buckets: `product-images` and `service-images` (public read)
5. Copy Project URL and **anon** public key
6. Edit `js/supabase-client.js` and replace `YOUR_SUPABASE_URL` and `YOUR_SUPABASE_ANON_KEY`
7. Assign the first admin in SQL only:
   ```sql
   update public.profiles set role = 'admin' where email = 'your-email@example.com';
   ```
   Never expose an admin registration page.

## 3. Security
- RLS is enabled in the schema
- Service role key must never appear in browser JavaScript
- Frontend role checks are UX only; database policies enforce access

## 4. Without Supabase
- Demo products/services and wishlist still work
- Seller and admin UIs show clear setup messages
- Forms do not pretend data was saved

## 5. Payment
Not enabled. Orders and bookings are request-only.
