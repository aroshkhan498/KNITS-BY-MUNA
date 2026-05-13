import type { Metadata } from "next";
import { db } from "@/db";
import { products } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { ProductSection } from "@/components/product-section";
import { CategoriesSection } from "@/components/categories-section";
import { InstagramSection } from "@/components/instagram-section";
import { CTABanner } from "@/components/cta-banner";
import type { Product } from "@/lib/types";

export const metadata: Metadata = {
  title: "Knits by Muna – Handmade Crochet Accessories",
  description:
    "Premium handmade crochet accessories from Bangladesh. Flower keychains, bag charms, phone charms, mini bouquets & more.",
};

export const revalidate = 3600;

async function getProducts(): Promise<Product[]> {
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

export default async function Home() {
  const allProducts = await getProducts();

  const featured = allProducts.filter((p) => p.isFeatured).slice(0, 8);
  const newArrivals = allProducts.filter((p) => p.isNewArrival).slice(0, 8);
  const trending = allProducts.filter((p) => p.isTrending).slice(0, 8);
  const onSale = allProducts
    .filter((p) => p.discountedPrice && Number(p.discountedPrice) < Number(p.price))
    .slice(0, 8);

  // Fallback: use sample products if DB returns nothing special
  const displayFeatured =
    featured.length > 0 ? featured : allProducts.slice(0, 8);
  const displayNew =
    newArrivals.length > 0 ? newArrivals : allProducts.slice(0, 4);
  const displayTrending =
    trending.length > 0 ? trending : allProducts.slice(0, 4);
  const displaySale = onSale.length > 0 ? onSale : [];

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />

        {/* Categories */}
        <CategoriesSection />

        {/* Featured Products */}
        <ProductSection
          title="Featured Items"
          subtitle="Our most loved crochet creations"
          products={displayFeatured}
          viewAllHref="/shop?filter=featured"
          accentColor="primary"
        />

        {/* New Arrivals */}
        {displayNew.length > 0 && (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-muted/5 via-muted/10 to-muted/5 pointer-events-none" />
            <ProductSection
              title="New Arrivals"
              subtitle="Just dropped — fresh from our hands"
              products={displayNew}
              viewAllHref="/shop?filter=new"
              accentColor="secondary"
            />
          </div>
        )}

        {/* Trending */}
        {displayTrending.length > 0 && (
          <ProductSection
            title="Trending Now"
            subtitle="Most popular picks this season"
            products={displayTrending}
            viewAllHref="/shop?filter=trending"
            accentColor="accent"
          />
        )}

        {/* On Sale */}
        {displaySale.length > 0 && (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-muted/5 via-muted/10 to-muted/5 pointer-events-none" />
            <ProductSection
              title="🔥 On Sale"
              subtitle="Limited time offers — grab them before they're gone!"
              products={displaySale}
              viewAllHref="/shop?filter=sale"
              accentColor="primary"
            />
          </div>
        )}

        {/* CTA */}
        <CTABanner />

        {/* Instagram Gallery */}
        <InstagramSection />
      </main>
      <Footer />
    </>
  );
}
