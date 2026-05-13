"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Sparkles, ArrowRight, MessageCircle } from "lucide-react";

export function CTABanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl border border-primary/30 glass-card p-12 md:p-16 text-center"
        >
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-primary/10 blur-[80px]" />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-secondary/10 blur-[80px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-accent/5 blur-[100px]" />
          </div>

          {/* Sparkle decoration */}
          <div className="absolute top-6 right-8 text-primary/30 text-4xl">✦</div>
          <div className="absolute bottom-6 left-8 text-secondary/30 text-3xl">✦</div>
          <div className="absolute top-12 left-1/4 text-accent/20 text-2xl">✦</div>

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              <Sparkles className="h-4 w-4" />
              Custom Orders Welcome
            </motion.div>

            <h2 className="font-heading text-4xl md:text-5xl font-bold gradient-text-pink mb-4">
              Want Something Unique?
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              Can't find exactly what you're looking for? We create custom
              crochet pieces just for you — your colors, your design, your story.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/custom-order"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 hover:shadow-[0_0_30px_oklch(0.72_0.25_320/0.5)] transition-all duration-300 hover:-translate-y-0.5"
              >
                <Sparkles className="h-5 w-5" />
                Request Custom Order
              </Link>
              <a
                href="https://m.me/knitsbymuna"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-secondary/40 text-secondary font-bold text-lg hover:bg-secondary/10 hover:border-secondary/60 hover:shadow-[0_0_20px_oklch(0.65_0.22_255/0.3)] transition-all duration-300 hover:-translate-y-0.5"
              >
                <MessageCircle className="h-5 w-5" />
                Message Us
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
