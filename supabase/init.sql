-- Knits by Muna — run once in Supabase: SQL Editor → New query → Run
-- Matches Drizzle schema in src/db/schema.ts

CREATE TABLE IF NOT EXISTS categories (
  id text PRIMARY KEY,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  image_url text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS products (
  id serial PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  price numeric(10, 2) NOT NULL,
  discounted_price numeric(10, 2),
  image_url text NOT NULL,
  category_id text REFERENCES categories(id),
  in_stock boolean NOT NULL DEFAULT true,
  is_featured boolean NOT NULL DEFAULT false,
  is_new_arrival boolean NOT NULL DEFAULT false,
  is_trending boolean NOT NULL DEFAULT false,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS product_images (
  id text PRIMARY KEY,
  product_id integer NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS discounts (
  id text PRIMARY KEY,
  code text NOT NULL UNIQUE,
  percentage integer NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  expires_at timestamp,
  created_at timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS inquiries (
  id text PRIMARY KEY,
  customer_name text NOT NULL,
  customer_phone text,
  message text NOT NULL,
  product_id integer REFERENCES products(id),
  status text NOT NULL DEFAULT 'new',
  created_at timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS admin_users (
  id text PRIMARY KEY,
  email text NOT NULL UNIQUE,
  role text NOT NULL DEFAULT 'admin',
  created_at timestamp NOT NULL DEFAULT now(),
  last_login_at timestamp
);
