"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQS = [
  {
    q: "How do I place an order?",
    a: "Simply browse our products, add items to your cart, then click 'Place Order via Messenger'. This will open Facebook Messenger with your order details pre-filled. We'll confirm your order and arrange delivery from there!",
  },
  {
    q: "Are all products truly handmade?",
    a: "Absolutely! Every single item in our shop is 100% handmade by Muna. We use premium quality yarn and put love into every stitch. No two pieces are exactly the same, which makes each item uniquely special.",
  },
  {
    q: "Do you accept custom orders?",
    a: "Yes! Custom orders are one of our favorite things. You can request specific colors, sizes, or entirely new designs. Visit our Custom Order page or message us directly on Facebook/Instagram to discuss your vision.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We currently accept bKash, Nagad, and bank transfers within Bangladesh. All payment details will be shared after you confirm your order via Messenger. We do not process payments online for security reasons.",
  },
  {
    q: "How long does it take to receive my order?",
    a: "Most in-stock items ship within 2-3 business days. Custom orders typically take 5-10 business days depending on complexity. We'll give you a specific timeline when you place your order.",
  },
  {
    q: "Do you ship outside Bangladesh?",
    a: "We currently ship within Bangladesh only. International shipping may be available in the future — follow us on Instagram or Facebook for updates!",
  },
  {
    q: "Can I return or exchange a product?",
    a: "Since all our items are handmade-to-order, we don't accept returns unless the item is damaged during shipping or has a significant defect. Please message us within 48 hours of receiving your order if there's an issue.",
  },
  {
    q: "How should I care for my crochet items?",
    a: "Gently hand-wash in cool water with mild detergent. Lay flat to dry. Avoid wringing or twisting. For keychains and charms, keep away from water to preserve their shape and color.",
  },
  {
    q: "Are the colors accurate to photos?",
    a: "We photograph our items in natural lighting to show the most accurate colors. However, colors may appear slightly different on different screens. If color accuracy is very important to you, feel free to ask for additional photos.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="glass-card rounded-2xl border border-border/50 hover:border-primary/30 transition-all overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left"
      >
        <span className="font-semibold text-foreground text-sm md:text-base leading-snug">
          {question}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-primary"
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border/50 pt-4">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <section className="relative py-20 overflow-hidden border-b border-border/50">
          <div className="absolute inset-0 animated-gradient opacity-40" />
          <div className="relative container mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-2xl bg-primary/10 border border-primary/30">
                <HelpCircle className="h-10 w-10 text-primary" />
              </div>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold gradient-text-pink mb-3">
              Frequently Asked Questions
            </h1>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              Everything you need to know about Knits by Muna
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <FAQItem key={i} question={faq.q} answer={faq.a} />
              ))}
            </div>

            <div className="mt-16 glass-card rounded-2xl p-8 border border-primary/20 text-center">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-3">
                Still have questions?
              </h2>
              <p className="text-muted-foreground mb-6">
                We're always happy to help! Reach out to us directly.
              </p>
              <a
                href="https://m.me/knitsbymuna"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 hover:shadow-[0_0_25px_oklch(0.72_0.25_320/0.4)] transition-all"
              >
                Chat with us on Messenger
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
