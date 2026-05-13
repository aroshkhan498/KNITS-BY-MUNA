import type { Metadata } from "next";
import { db } from "@/db";
import { products } from "@/db/schema";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProductSection } from "@/components/product-section";
import type { Product } from "@/lib/types";
import { toProduct } from "@/lib/product-mapper";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const CATEGORY_META: Record<string, { name: string; emoji: string; description: string }> = {
  keychains: {
    name: "Crochet Keychains",
    emoji: "🔑",
    description: "Adorable handmade keychains for bags, keys, and gifts.",
  },
  "bag-charms": {
    name: "Bag Charms",
    emoji: "👜",
    description: "Beautiful crochet accessories for your handbag or backpack.",
  },
  "phone-charms": {
    name: "Phone Charms",
    emoji: "📱",
    description: "Tiny handmade charms to personalize your phone.",
  },
  "mini-bouquets": {
    name: "Mini Bouquets",
    emoji: "💐",
    description: "Everlasting floral arrangements for home and gifting.",
  },
  "home-decor": {
    name: "Home Décor",
    emoji: "🏠",
    description: "Handmade decorations to warm up your living space.",
  },
  "gift-sets": {
    name: "Gift Sets",
    emoji: "🎁",
    description: "Curated crochet collections for every celebration.",
  },
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const meta = CATEGORY_META[slug];
  if (!meta) return { title: "Category Not Found" };
  return {
    title: `${meta.name} – Knits by Muna`,
    description: meta.description,
  };
}

async function getCategoryProducts(categorySlug: string): Promise<Product[]> {
  try {
    const rows = await db.select().from(products);
    return rows.map((row) => ({ ...toProduct(row), tags: [categorySlug] }));
  } catch {
    return [];
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const meta = CATEGORY_META[slug];
  if (!meta) notFound();

  const categoryProducts = await getCategoryProducts(slug);

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <section className="relative py-20 overflow-hidden border-b border-border/50">
          <div className="absolute inset-0 animated-gradient opacity-40" />
          <div className="relative container mx-auto px-4">
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              All Categories
            </Link>
            <div className="text-center">
              <span className="text-6xl mb-4 block">{meta.emoji}</span>
              <h1 className="font-heading text-4xl md:text-5xl font-bold gradient-text-pink mb-3">
                {meta.name}
              </h1>
              <p className="text-muted-foreground text-lg max-w-md mx-auto">
                {meta.description}
              </p>
            </div>
          </div>
        </section>

        <ProductSection
          title={`All ${meta.name}`}
          products={categoryProducts}
          viewAllHref="/shop"
          accentColor="primary"
        />
      </main>
      <Footer />
    </>
  );
}
