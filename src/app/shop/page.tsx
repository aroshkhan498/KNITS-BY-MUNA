import type { Metadata } from "next";
import { Suspense } from "react";
import { db } from "@/db";
import { products } from "@/db/schema";
import { desc } from "drizzle-orm";
import { ShopClient } from "@/components/shop-client";
import type { Product } from "@/lib/types";
import { FALLBACK_PRODUCTS } from "@/lib/fallback-products";
import { toProduct } from "@/lib/product-mapper";

export const metadata: Metadata = {
  title: "Shop – Handmade Crochet Accessories",
  description:
    "Browse all handmade crochet keychains, bag charms, phone charms, and mini bouquets. Shop premium handcrafted accessories.",
};

export const dynamic = "force-dynamic";

async function getAllProducts(): Promise<{ products: Product[]; error: string | null }> {
  try {
    const rows = await db
      .select()
      .from(products)
      .orderBy(desc(products.createdAt));
    return { products: rows.map(toProduct), error: null };
  } catch (error: any) {
    return {
      products: [],
      error:
        error?.message ||
        "Failed to load products. Check the database connection and schema.",
    };
  }
}

export default async function ShopPage() {
  const { products: allProducts, error: dbErrorMessage } = await getAllProducts();
  const displayProducts = allProducts.length > 0 ? allProducts : FALLBACK_PRODUCTS;

  return (
    <Suspense>
      <ShopClient products={displayProducts} dbErrorMessage={dbErrorMessage} />
    </Suspense>
  );
}
