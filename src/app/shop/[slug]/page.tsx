import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { ProductDetailClient } from "@/components/product-detail-client";
import type { Product } from "@/lib/types";
import { FALLBACK_PRODUCTS, getFallbackProductById } from "@/lib/fallback-products";
import { toProduct } from "@/lib/product-mapper";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

type Props = { params: Promise<{ slug: string }> };

async function getProduct(slug: string): Promise<Product | null> {
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

  // Get related products
  let related: Product[] = [];
  try {
    const rows = await db.select().from(products).limit(4);
    related = rows.length > 0
      ? rows
          .filter((r) => String(r.id) !== product.id)
          .slice(0, 4)
          .map(toProduct)
      : FALLBACK_PRODUCTS.filter((item) => item.id !== product.id).slice(0, 4);
  } catch {
    related = FALLBACK_PRODUCTS.filter((item) => item.id !== product.id).slice(0, 4);
  }

  return (
    <>
      <Navbar />
      <ProductDetailClient product={product} related={related} />
      <Footer />
    </>
  );
}
