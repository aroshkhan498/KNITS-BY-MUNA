"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image, { getImageProps } from "next/image";
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

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(18,0,32,0.1)_0%,rgba(4,6,20,0.28)_35%,rgba(4,6,20,0.72)_72%,rgba(4,6,20,0.9)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/55" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-background/40 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      <div className="relative z-10 container mx-auto flex min-h-[100svh] items-center px-4 py-10 sm:py-16 lg:py-20">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary shadow-[0_0_30px_rgba(236,72,153,0.12)] backdrop-blur-md sm:text-sm"
          >
            <Sparkles className="h-4 w-4" />
            Handcrafted with love in Bangladesh
            <Sparkles className="h-4 w-4" />
          </motion.div>

          <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-10">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="hidden lg:flex justify-start"
            >
              <div className="relative h-32 w-32 overflow-hidden rounded-full border border-primary/40 bg-black/30 shadow-[0_0_35px_oklch(0.72_0.25_320/0.35)]">
                <Image src="/logo.png" alt="Knits by Muna" fill className="object-cover" priority />
              </div>
            </motion.div>

            <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.12 }}
                className="relative mb-4 h-24 w-24 overflow-hidden rounded-full border border-primary/40 bg-black/35 shadow-[0_0_45px_oklch(0.72_0.25_320/0.35),0_0_100px_oklch(0.72_0.25_320/0.14)] sm:h-28 sm:w-28"
              >
                <Image src="/logo.png" alt="Knits by Muna" fill className="object-cover" priority />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.18 }}
                className="font-heading text-5xl font-bold leading-[0.92] text-white sm:text-6xl lg:text-8xl"
              >
                <span className="gradient-text-pink text-glow-pink">Handmade</span>
                <br />
                <span className="text-white">With Love</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.28 }}
                className="mt-5 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base lg:text-lg"
              >
                Unique crochet flower keychains, bag charms, phone charms and mini bouquets, each piece lovingly handcrafted just for you.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.36 }}
                className="mt-7 flex flex-col gap-4 sm:flex-row"
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
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-primary/40 bg-black/20 px-8 py-4 text-lg font-bold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/60 hover:bg-primary/10 hover:shadow-[0_0_20px_oklch(0.72_0.25_320/0.2)]"
                >
                  <Sparkles className="h-5 w-5" />
                  Custom Order
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.46 }}
                className="mt-10 grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-4"
              >
                {[
                  { icon: Star, label: "Handmade with Love", value: "\u2726" },
                  { icon: Package2, label: "Unique Designs", value: "50+" },
                  { icon: Sparkles, label: "Premium Yarn Quality", value: "100%" },
                  { icon: Sparkles, label: "Made in Bangladesh", value: "\u2661" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-center gap-3 rounded-2xl border border-transparent bg-black/30 px-4 py-4 text-left backdrop-blur-md animate-neon-border"
                    style={{
                      background: "linear-gradient(oklch(0.12 0.015 270 / 0.8), oklch(0.12 0.015 270 / 0.8)) padding-box, linear-gradient(135deg, oklch(0.75 0.24 200 / 0.8), oklch(0.72 0.25 320 / 0.8), oklch(0.75 0.24 200 / 0.8)) border-box",
                      borderWidth: "1px",
                      backgroundSize: "100% 100%, 200% 200%",
                      backgroundPosition: "0 0, 0% 0%",
                    }}
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary shadow-[0_0_20px_oklch(0.72_0.25_320/0.2)]">
                      <stat.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white">{stat.value}</div>
                      <div className="text-sm text-white/70">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="hidden lg:flex justify-end"
            >
              <div className="relative h-36 w-36 overflow-hidden rounded-full border border-primary/40 bg-black/30 shadow-[0_0_35px_oklch(0.72_0.25_320/0.35)]">
                <Image src="/logo.png" alt="Knits by Muna" fill className="object-cover" priority />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
