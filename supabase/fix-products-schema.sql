-- Run this if product inserts fail because an older products table exists.
-- It keeps existing rows and converts numeric product IDs to text IDs.

ALTER TABLE products
  ALTER COLUMN id TYPE text USING id::text;

ALTER TABLE products
  ALTER COLUMN price TYPE numeric(10, 2) USING price::numeric,
  ALTER COLUMN discounted_price TYPE numeric(10, 2) USING discounted_price::numeric;

ALTER TABLE products
  ALTER COLUMN image_url SET NOT NULL,
  ALTER COLUMN in_stock SET DEFAULT true,
  ALTER COLUMN in_stock SET NOT NULL;

ALTER TABLE products
  ADD COLUMN IF NOT EXISTS category_id text,
  ADD COLUMN IF NOT EXISTS is_featured boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS is_new_arrival boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS is_trending boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS created_at timestamp NOT NULL DEFAULT now(),
  ADD COLUMN IF NOT EXISTS updated_at timestamp NOT NULL DEFAULT now();

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

CREATE TABLE IF NOT EXISTS product_images (
  id text PRIMARY KEY,
  product_id text NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamp NOT NULL DEFAULT now()
);
