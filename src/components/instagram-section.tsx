"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ExternalLink, Heart } from "lucide-react";
import { InstagramIcon } from "@/components/icons/social";

// Use actual product images from /public
const GALLERY_IMAGES = [
  "/WhatsApp Image 2026-05-04 at 3.00.17 AM.jpeg",
  "/WhatsApp Image 2026-05-04 at 3.00.02 AM (2).jpeg",
  "/WhatsApp Image 2026-05-04 at 3.00.11 AM (1).jpeg",
  "/WhatsApp Image 2026-05-04 at 3.00.20 AM (2).jpeg",
  "/WhatsApp Image 2026-05-04 at 3.00.35 AM (2).jpeg",
  "/WhatsApp Image 2026-05-04 at 3.00.16 AM.jpeg",
];

export function InstagramSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-secondary" />
            <span className="text-secondary text-sm font-medium uppercase tracking-widest">
              Gallery
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-secondary" />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold gradient-text-blue mb-3">
            From Our Hands to Yours
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
            Real products, real love. Follow us on Instagram for daily drops! 🌸
          </p>
          <a
            href="https://www.instagram.com/knitsbymuna"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-secondary/40 text-secondary hover:bg-secondary/10 hover:border-secondary/60 transition-all duration-300 text-sm font-medium"
          >
            <InstagramIcon className="h-4 w-4" />
            @knitsbymuna
            <ExternalLink className="h-3 w-3 opacity-60" />
          </a>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
          {GALLERY_IMAGES.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="relative aspect-square overflow-hidden rounded-2xl group cursor-pointer"
            >
              <img
                src={src}
                alt={`Knits by Muna handmade crochet product ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-4">
                <div className="flex items-center gap-2 text-white text-sm font-medium">
                  <Heart className="h-4 w-4 fill-current text-primary" />
                  Handmade
                </div>
              </div>
              {/* Border glow on hover */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/40 transition-all duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
