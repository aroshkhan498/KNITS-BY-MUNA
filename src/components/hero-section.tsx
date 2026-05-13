"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { getImageProps } from "next/image";
import { ArrowRight, Sparkles, Star, Package2 } from "lucide-react";

const heroImageAlt = "";

const {
  props: { srcSet: desktopSrcSet },
} = getImageProps({
  alt: heroImageAlt,
  src: "/hero_desktop.png",
  width: 1536,
  height: 1024,
  sizes: "100vw",
  quality: 78,
  fetchPriority: "high",
});

const {
  props: { srcSet: mobileSrcSet, ...mobileImageProps },
} = getImageProps({
  alt: heroImageAlt,
  src: "/hero_mobile.png",
  width: 853,
  height: 1844,
  sizes: "100vw",
  quality: 72,
  fetchPriority: "high",
});

export function HeroSection() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-black">
      <div className="absolute inset-0">
        <picture className="block h-full w-full">
          <source media="(min-width: 768px)" srcSet={desktopSrcSet} />
          <source srcSet={mobileSrcSet} />
          <img
            {...mobileImageProps}
            alt={heroImageAlt}
            aria-hidden="true"
            className="h-full w-full object-cover object-center"
            style={{
              ...mobileImageProps.style,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </picture>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(4,6,20,0.08)_0%,rgba(4,6,20,0.58)_56%,rgba(4,6,20,0.88)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/60" />
      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-background/30 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      <div className="relative z-10 container mx-auto flex min-h-[100svh] items-center px-4 py-16 sm:py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto w-full max-w-4xl rounded-[2rem] border border-white/10 bg-black/35 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-8 lg:p-12"
        >
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            Handcrafted with love in Bangladesh
            <Sparkles className="h-4 w-4" />
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 font-heading text-5xl font-bold leading-[0.95] text-white sm:text-6xl lg:text-8xl"
          >
            <span className="gradient-text-pink text-glow-pink">Handmade</span>
            <br />
            <span>With Love</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/78 sm:text-lg lg:text-xl"
          >
            Unique crochet flower keychains, bag charms, phone charms & mini
            bouquets, each piece lovingly handcrafted to feel special from the
            first glance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center"
          >
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-4 text-lg font-bold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-[0_0_30px_oklch(0.72_0.25_320/0.5)]"
            >
              Shop Collection
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/custom-order"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-primary/40 px-8 py-4 text-lg font-bold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/60 hover:bg-primary/10 hover:shadow-[0_0_20px_oklch(0.72_0.25_320/0.2)]"
            >
              <Sparkles className="h-5 w-5" />
              Custom Order
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 grid gap-3 sm:grid-cols-3"
          >
            {[
              { icon: Star, label: "5.0 Rating", value: "★★★★★" },
              { icon: Package2, label: "Products", value: "50+" },
              { icon: Sparkles, label: "Handmade", value: "100%" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1 rounded-2xl border border-white/10 bg-white/5 px-5 py-4"
              >
                <span className="text-2xl font-bold gradient-text-pink">
                  {stat.value}
                </span>
                <span className="text-sm text-white/70">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
