"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "./product-card";
import type { Product } from "@/lib/types";

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  fallbackProducts?: Product[];
  viewAllHref?: string;
  accentColor?: "primary" | "secondary" | "accent";
}

export function ProductSection({
  title,
  subtitle,
  products,
  viewAllHref = "/shop",
  accentColor = "primary",
}: ProductSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const accentClasses = {
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-accent",
  };

  const barClasses = {
    primary: "bg-gradient-to-r from-primary to-accent",
    secondary: "bg-gradient-to-r from-secondary to-accent",
    accent: "bg-gradient-to-r from-accent to-primary",
  };

  return (
    <section ref={ref} className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`h-1 w-12 rounded-full ${barClasses[accentColor]}`}
              />
              <div
                className={`h-1 w-6 rounded-full ${barClasses[accentColor]} opacity-50`}
              />
            </div>
            <h2
              className={`font-heading text-3xl md:text-4xl font-bold ${accentClasses[accentColor]}`}
            >
              {title}
            </h2>
            {subtitle && (
              <p className="text-muted-foreground mt-2 text-sm">{subtitle}</p>
            )}
          </div>

          <Link
            href={viewAllHref}
            className={`hidden sm:flex items-center gap-2 text-sm font-medium ${accentClasses[accentColor]} hover:opacity-80 transition-opacity group`}
          >
            View All
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {products.length === 0 ? (
          fallbackProducts && fallbackProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {fallbackProducts.map((product, i) => (
                <ProductCard key={`fallback-${product.id}-${i}`} product={product} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <p>Check back soon for new items! 🌸</p>
            </div>
          )
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}

        <div className="sm:hidden text-center mt-8">
          <Link
            href={viewAllHref}
            className={`inline-flex items-center gap-2 text-sm font-medium ${accentClasses[accentColor]} border border-current/30 px-6 py-2.5 rounded-xl hover:bg-current/10 transition-all`}
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
