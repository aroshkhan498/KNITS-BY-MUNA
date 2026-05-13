import type { Metadata } from "next";
import { Suspense } from "react";
import { db } from "@/db";
import { products } from "@/db/schema";
import { desc } from "drizzle-orm";
import { ShopClient } from "@/components/shop-client";
import type { Product } from "@/lib/types";

export const metadata: Metadata = {
  title: "Shop – Handmade Crochet Accessories",
  description:
    "Browse all handmade crochet keychains, bag charms, phone charms, and mini bouquets. Shop premium handcrafted accessories.",
};

export const revalidate = 3600;

async function getAllProducts(): Promise<Product[]> {
  try {
    const rows = await db
      .select()
      .from(products)
      .orderBy(desc(products.createdAt));
    return rows.map((r) => ({
      ...r,
      price: Number(r.price),
      discountedPrice: r.discountedPrice ? Number(r.discountedPrice) : null,
      slug: r.id,
      isFeatured: false,
      isNewArrival: false,
      isTrending: false,
      images: [],
      colors: [],
      tags: [],
    }));
  } catch {
    return [];
  }
}

export default async function ShopPage() {
  const allProducts = await getAllProducts();

  return (
    <Suspense>
      <ShopClient products={allProducts} />
    </Suspense>
  );
}
