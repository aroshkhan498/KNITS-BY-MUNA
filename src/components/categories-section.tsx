"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CATEGORY_CATALOG } from "@/lib/categories";

const CATEGORIES = CATEGORY_CATALOG.map((category, index) => ({
  id: category.slug,
  name: category.name,
  emoji: category.emoji,
  href: `/categories/${category.slug}`,
  gradient: [
    "from-primary/20 to-primary/5",
    "from-secondary/20 to-secondary/5",
    "from-accent/20 to-accent/5",
    "from-primary/20 to-secondary/5",
    "from-secondary/20 to-accent/5",
    "from-accent/20 to-primary/5",
  ][index % 6],
  border: [
    "border-primary/30",
    "border-secondary/30",
    "border-accent/30",
    "border-primary/20",
    "border-secondary/20",
    "border-accent/20",
  ][index % 6],
  glow: [
    "hover:shadow-[0_0_30px_oklch(0.72_0.25_320/0.3)]",
    "hover:shadow-[0_0_30px_oklch(0.65_0.22_255/0.3)]",
    "hover:shadow-[0_0_30px_oklch(0.68_0.2_290/0.3)]",
    "hover:shadow-[0_0_30px_oklch(0.72_0.25_320/0.25)]",
    "hover:shadow-[0_0_30px_oklch(0.65_0.22_255/0.25)]",
    "hover:shadow-[0_0_30px_oklch(0.68_0.2_290/0.25)]",
  ][index % 6],
}));

export function CategoriesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      {/* BG accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/5 via-transparent to-muted/5 pointer-events-none" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary" />
            <span className="text-primary text-sm font-medium uppercase tracking-widest">
              Browse
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary" />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold gradient-text-pink mb-3">
            Shop by Category
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-sm">
            Find the perfect handmade piece for every occasion
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <Link
                href={cat.href}
                className={`flex flex-col items-center gap-3 p-6 rounded-2xl border bg-gradient-to-br ${cat.gradient} ${cat.border} ${cat.glow} hover:-translate-y-1 transition-all duration-300 group text-center`}
              >
                <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                  {cat.emoji}
                </span>
                <span className="text-sm font-semibold text-foreground leading-tight">
                  {cat.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-8"
        >
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:opacity-80 transition-opacity"
          >
            View all categories <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
