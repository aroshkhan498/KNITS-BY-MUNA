import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { ArrowLeft, Grid3X3 } from "lucide-react";

export const metadata: Metadata = {
  title: "Categories – Knits by Muna",
  description:
    "Browse all handmade crochet product categories — keychains, bag charms, phone charms, bouquets, and more.",
};

const CATEGORIES = [
  {
    slug: "keychains",
    name: "Crochet Keychains",
    emoji: "🔑",
    description:
      "Adorable handmade keychains in various flower, fruit, and character designs. Perfect for bags, keys, and gifts.",
    color: "border-primary/30 from-primary/10 to-primary/5",
    glow: "hover:shadow-[0_0_30px_oklch(0.72_0.25_320/0.2)]",
  },
  {
    slug: "bag-charms",
    name: "Bag Charms",
    emoji: "👜",
    description:
      "Beautiful crochet bag accessories that add a unique touch to your handbag, backpack, or tote.",
    color: "border-secondary/30 from-secondary/10 to-secondary/5",
    glow: "hover:shadow-[0_0_30px_oklch(0.65_0.22_255/0.2)]",
  },
  {
    slug: "phone-charms",
    name: "Phone Charms",
    emoji: "📱",
    description:
      "Tiny crochet charms to attach to your phone strap or phone case. Make your phone one-of-a-kind.",
    color: "border-accent/30 from-accent/10 to-accent/5",
    glow: "hover:shadow-[0_0_30px_oklch(0.68_0.2_290/0.2)]",
  },
  {
    slug: "mini-bouquets",
    name: "Mini Bouquets",
    emoji: "💐",
    description:
      "Everlasting handmade floral arrangements. Perfect for home décor, gifts, and special occasions.",
    color: "border-primary/20 from-primary/5 to-secondary/5",
    glow: "hover:shadow-[0_0_30px_oklch(0.72_0.25_320/0.15)]",
  },
  {
    slug: "home-decor",
    name: "Home Décor",
    emoji: "🏠",
    description:
      "Handmade crochet decorations to add warmth and character to your living spaces.",
    color: "border-secondary/20 from-secondary/5 to-accent/5",
    glow: "hover:shadow-[0_0_30px_oklch(0.65_0.22_255/0.15)]",
  },
  {
    slug: "gift-sets",
    name: "Gift Sets",
    emoji: "🎁",
    description:
      "Curated crochet gift collections, perfect for birthdays, Eid, anniversaries, and any celebration.",
    color: "border-accent/20 from-accent/5 to-primary/5",
    glow: "hover:shadow-[0_0_30px_oklch(0.68_0.2_290/0.15)]",
  },
];

export default function CategoriesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <section className="relative py-20 overflow-hidden border-b border-border/50">
          <div className="absolute inset-0 animated-gradient opacity-40" />
          <div className="relative container mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-2xl bg-primary/10 border border-primary/30">
                <Grid3X3 className="h-10 w-10 text-primary" />
              </div>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold gradient-text-pink mb-3">
              Browse by Category
            </h1>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              Find the perfect handmade piece for every moment
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/categories/${cat.slug}`}
                  className={`group flex flex-col p-6 rounded-2xl border bg-gradient-to-br ${cat.color} ${cat.glow} hover:-translate-y-1 transition-all duration-300`}
                >
                  <span className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {cat.emoji}
                  </span>
                  <h2 className="font-heading text-xl font-bold text-foreground mb-2">
                    {cat.name}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {cat.description}
                  </p>
                  <div className="mt-4 text-sm text-primary font-medium group-hover:gap-2 flex items-center gap-1 transition-all">
                    Browse {cat.name}
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-16 text-center glass-card rounded-2xl p-8 border border-primary/20">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-3">
                Don't see what you want?
              </h2>
              <p className="text-muted-foreground mb-6">
                We take custom orders! Message us and we'll make something
                special just for you.
              </p>
              <Link
                href="/custom-order"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 hover:shadow-[0_0_25px_oklch(0.72_0.25_320/0.4)] transition-all"
              >
                Request Custom Order
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
