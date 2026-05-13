"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Star, Package2 } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 animated-gradient" />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-secondary/10 blur-[100px] animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-accent/10 blur-[80px] animate-pulse delay-500" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(oklch(0.72 0.25 320) 1px, transparent 1px), linear-gradient(90deg, oklch(0.72 0.25 320) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-8"
        >
          <Sparkles className="h-4 w-4" />
          Handcrafted with love in Bangladesh
          <Sparkles className="h-4 w-4" />
        </motion.div>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <div className="relative w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-primary/40 shadow-[0_0_60px_oklch(0.72_0.25_320/0.4),0_0_120px_oklch(0.72_0.25_320/0.2)] animate-pulse-glow">
            <Image
              src="/logo.png"
              alt="Knits by Muna"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[1.1]"
        >
          <span className="gradient-text-pink text-glow-pink">Handmade</span>
          <br />
          <span className="text-foreground">With Love</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Unique crochet flower keychains, bag charms, phone charms & mini
          bouquets — each piece lovingly handcrafted just for you.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 hover:shadow-[0_0_30px_oklch(0.72_0.25_320/0.5)] transition-all duration-300 hover:-translate-y-0.5"
          >
            Shop Collection
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/custom-order"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-primary/40 text-primary font-bold text-lg hover:bg-primary/10 hover:border-primary/60 hover:shadow-[0_0_20px_oklch(0.72_0.25_320/0.2)] transition-all duration-300 hover:-translate-y-0.5"
          >
            <Sparkles className="h-5 w-5" />
            Custom Order
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-8 mt-16"
        >
          {[
            { icon: Star, label: "5.0 Rating", value: "★★★★★" },
            { icon: Package2, label: "Products", value: "50+" },
            { icon: Sparkles, label: "Handmade", value: "100%" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1 px-6 py-3 rounded-2xl glass border border-border/50"
            >
              <span className="text-2xl font-bold gradient-text-pink">
                {stat.value}
              </span>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
