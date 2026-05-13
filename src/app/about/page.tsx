import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Heart, Sparkles, MessageCircle } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/icons/social";

export const metadata: Metadata = {
  title: "About – Knits by Muna",
  description:
    "Learn about Knits by Muna — a handmade crochet brand born from love, creativity, and craft in Bangladesh.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 animated-gradient opacity-60" />
          <div className="absolute inset-0">
            <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-primary/10 blur-[80px]" />
            <div className="absolute bottom-1/3 right-1/4 w-60 h-60 rounded-full bg-secondary/10 blur-[60px]" />
          </div>
          <div className="relative container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-8">
              <Heart className="h-4 w-4 fill-current" />
              Our Story
            </div>
            <h1 className="font-heading text-5xl md:text-6xl font-bold gradient-text-pink mb-6">
              About Knits by Muna
            </h1>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
              Where every stitch tells a story and every piece is made with love.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
              <div className="relative">
                <div className="relative aspect-square rounded-3xl overflow-hidden border-2 border-primary/20 shadow-[0_0_60px_oklch(0.72_0.25_320/0.2)]">
                  <Image
                    src="/logo.png"
                    alt="Knits by Muna Logo"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 h-20 w-20 rounded-2xl glass-card border border-primary/30 flex items-center justify-center">
                  <span className="text-3xl">🌸</span>
                </div>
              </div>
              <div>
                <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                  Born from Passion & Craft
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Knits by Muna started as a personal passion project — a love for crochet
                  that grew into a beautiful brand. Every piece you see is handcrafted by
                  Muna herself, sitting in her cozy workshop in Bangladesh.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  From tiny flower keychains to elegant mini bouquets, each item carries
                  the warmth of handmade artistry. No two pieces are exactly alike —
                  that's the beauty of handmade.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our mission is simple: to spread joy through beautiful, affordable,
                  handcrafted accessories that make everyday moments feel special. 💕
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
              {[
                {
                  emoji: "✋",
                  title: "100% Handmade",
                  desc: "Every single stitch is made by hand with premium quality yarn.",
                },
                {
                  emoji: "🌍",
                  title: "Made in Bangladesh",
                  desc: "Proudly crafted in Bangladesh, supporting local artisanal craft.",
                },
                {
                  emoji: "💝",
                  title: "Made with Love",
                  desc: "We put our heart into every piece. Your happiness is our reward.",
                },
              ].map((v) => (
                <div
                  key={v.title}
                  className="glass-card rounded-2xl p-6 border border-primary/20 text-center hover:border-primary/40 hover:shadow-[0_0_20px_oklch(0.72_0.25_320/0.15)] transition-all"
                >
                  <span className="text-4xl mb-4 block">{v.emoji}</span>
                  <h3 className="font-heading font-bold text-lg text-foreground mb-2">
                    {v.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{v.desc}</p>
                </div>
              ))}
            </div>

            {/* Gallery from actual product photos */}
            <div>
              <h2 className="font-heading text-2xl font-bold gradient-text-blue text-center mb-8">
                A Glimpse of Our Work
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  "/WhatsApp Image 2026-05-04 at 3.00.04 AM.jpeg",
                  "/WhatsApp Image 2026-05-04 at 3.00.07 AM (1).jpeg",
                  "/WhatsApp Image 2026-05-04 at 3.00.13 AM.jpeg",
                  "/WhatsApp Image 2026-05-04 at 3.00.17 AM (2).jpeg",
                ].map((src, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-xl overflow-hidden border border-border/50 hover:border-primary/40 transition-all group"
                  >
                    <img
                      src={src}
                      alt={`Knits by Muna handmade product ${i + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-20 text-center glass-card rounded-3xl p-10 border border-primary/20">
              <h2 className="font-heading text-3xl font-bold gradient-text-pink mb-3">
                Find Us Online
              </h2>
              <p className="text-muted-foreground mb-8">
                Follow our journey and see new creations daily!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://www.instagram.com/knitsbymuna"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 transition-all font-medium"
                >
                  <InstagramIcon className="h-5 w-5" />
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61588396945080"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border border-secondary/30 bg-secondary/10 text-secondary hover:bg-secondary/20 transition-all font-medium"
                >
                  <FacebookIcon className="h-5 w-5" />
                  Facebook
                </a>
                <a
                  href="https://m.me/61588396945080"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border border-accent/30 bg-accent/10 text-accent hover:bg-accent/20 transition-all font-medium"
                >
                  <MessageCircle className="h-5 w-5" />
                  Message Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
