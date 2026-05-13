import { pgTable, text, decimal, boolean, timestamp, integer, serial } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';

// Categories Table
export const categories = pgTable('categories', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  imageUrl: text('image_url'),
  sortOrder: integer('sort_order').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Products Table
export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  discountedPrice: decimal('discounted_price', { precision: 10, scale: 2 }),
  imageUrl: text('image_url').notNull(),
  categoryId: text('category_id').references(() => categories.id),
  inStock: boolean('in_stock').default(true).notNull(),
  isFeatured: boolean('is_featured').default(false).notNull(),
  isNewArrival: boolean('is_new_arrival').default(false).notNull(),
  isTrending: boolean('is_trending').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Product Images Table (Supporting multiple images per product)
export const productImages = pgTable('product_images', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  productId: integer('product_id').references(() => products.id, { onDelete: 'cascade' }).notNull(),
  imageUrl: text('image_url').notNull(),
  sortOrder: integer('sort_order').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Discounts Table
export const discounts = pgTable('discounts', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  code: text('code').notNull().unique(),
  percentage: integer('percentage').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  expiresAt: timestamp('expires_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Inquiries / Order Messages Table
export const inquiries = pgTable('inquiries', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  customerName: text('customer_name').notNull(),
  customerPhone: text('customer_phone'),
  message: text('message').notNull(),
  productId: integer('product_id').references(() => products.id),
  status: text('status').default('new').notNull(), // new, read, replied
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Admin Users Table
export const adminUsers = pgTable('admin_users', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  email: text('email').notNull().unique(),
  role: text('role').default('admin').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  lastLoginAt: timestamp('last_login_at'),
});
