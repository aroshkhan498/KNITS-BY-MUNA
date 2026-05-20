import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { ProductDetailClient } from "@/components/product-detail-client";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/types";
import { FALLBACK_PRODUCTS, getFallbackProductById } from "@/lib/fallback-products";
import { toProduct } from "@/lib/product-mapper";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Suspense, cache } from "react";

type Props = { params: Promise<{ slug: string }> };

const getProduct = cache(async (slug: string): Promise<Product | null> => {
  try {
    const rows = await db
      .select()
      .from(products)
      .where(eq(products.id, Number(slug)))
      .limit(1);
    if (rows.length === 0) return getFallbackProductById(slug);
    return toProduct(rows[0]);
  } catch {
    return getFallbackProductById(slug);
  }
});

const getRelatedProducts = cache(async (currentProductId: string): Promise<Product[]> => {
  try {
    const rows = await db.select().from(products).limit(4);
    return rows.length > 0
      ? rows
          .filter((row) => String(row.id) !== currentProductId)
          .slice(0, 4)
          .map(toProduct)
      : FALLBACK_PRODUCTS.filter((item) => item.id !== currentProductId).slice(0, 4);
  } catch {
    return FALLBACK_PRODUCTS.filter((item) => item.id !== currentProductId).slice(0, 4);
  }
});

async function RelatedProducts({ currentProductId }: { currentProductId: string }) {
  const related = await getRelatedProducts(currentProductId);

  if (related.length === 0) {
    return null;
  }

  return (
    <div className="mt-24">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-1 w-12 rounded-full bg-gradient-to-r from-primary to-accent" />
        <h2 className="font-heading text-2xl font-bold text-primary">
          You May Also Like
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {related.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </div>
  );
}

function RelatedProductsFallback() {
  return (
    <div className="mt-24 animate-pulse">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-1 w-12 rounded-full bg-border" />
        <div className="h-6 w-40 rounded bg-border" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="rounded-2xl border border-border/50 p-4">
            <div className="aspect-square rounded-xl bg-border/50 mb-4" />
            <div className="h-4 w-3/4 rounded bg-border/50 mb-2" />
            <div className="h-3 w-full rounded bg-border/40 mb-2" />
            <div className="h-3 w-2/3 rounded bg-border/40" />
          </div>
        ))}
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.title} – Knits by Muna`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.imageUrl],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  return (
    <>
      <Navbar />
      <ProductDetailClient product={product} />
      <Suspense fallback={<RelatedProductsFallback />}>
        <RelatedProducts currentProductId={product.id} />
      </Suspense>
      <Footer />
    </>
  );
}
