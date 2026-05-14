import type { Metadata } from "next";
import { db } from "@/db";
import { products } from "@/db/schema";
import { desc } from "drizzle-orm";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { ProductSection } from "@/components/product-section";
import { InstagramSection } from "@/components/instagram-section";
import { CTABanner } from "@/components/cta-banner";
import { Testimonials } from "@/components/testimonials";
import type { Product } from "@/lib/types";
import { FALLBACK_PRODUCTS } from "../lib/fallback-products";
import { toProduct } from "@/lib/product-mapper";
import { shuffle } from "@/lib/utils";

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
    return rows.map(toProduct);
  } catch {
    return [];
  }
}

export default async function Home() {
  const allProducts = await getProducts();
  const sourceProducts: Product[] =
    allProducts.length > 0 ? allProducts : FALLBACK_PRODUCTS;

  const featured = sourceProducts.filter((p) => p.isFeatured).slice(0, 8);
  const newArrivals = sourceProducts.filter((p) => p.isNewArrival).slice(0, 8);
  const trending = sourceProducts.filter((p) => p.isTrending).slice(0, 8);
  const onSale = sourceProducts
    .filter((p) => p.discountedPrice && Number(p.discountedPrice) < Number(p.price))
    .slice(0, 8);

  // Fallback: use sample products if DB returns nothing special
  const displayFeatured = shuffle(
    featured.length > 0 ? featured : sourceProducts
  ).slice(0, 8);
  const displayNew = shuffle(
    newArrivals.length > 0 ? newArrivals : sourceProducts.slice(0, 4)
  );
  const displayTrending = shuffle(
    trending.length > 0 ? trending : sourceProducts.slice(0, 4)
  );
  const displaySale = shuffle(onSale.length > 0 ? onSale : sourceProducts.filter(
    (p) => p.discountedPrice && Number(p.discountedPrice) < Number(p.price)
  ));

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />

        {/* Categories hidden */}

        {/* Featured Products */}
        <ProductSection
          title="Featured Items"
          subtitle="Our most loved crochet creations"
          products={displayFeatured}
            fallbackProducts={shuffle(sourceProducts).slice(0, 8)}
          viewAllHref="/shop"
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
              viewAllHref="/shop"
              accentColor="secondary"
            />
          </div>
        )}

        {/* Trending */}
        {false && (
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

        {/* Testimonials */}
        <Testimonials />

        {/* Instagram Gallery */}
        {false && <InstagramSection />}
      </main>
      <Footer />
    </>
  );
}
