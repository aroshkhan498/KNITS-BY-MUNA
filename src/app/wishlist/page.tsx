"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Heart, ShoppingCart, Trash2, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useWishlist } from "@/components/wishlist-context";
import { useCart } from "@/components/cart-context";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";

export default function WishlistPage() {
  const { items, removeItem } = useWishlist();
  const { addItem } = useCart();

  const handleMoveToCart = (item: typeof items[0]) => {
    addItem({
      id: item.id,
      title: item.title,
      price: item.price,
      imageUrl: item.imageUrl,
      slug: item.slug,
    });
    removeItem(item.id);
    toast.success(`${item.title} moved to cart! 🛍️`);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center gap-3 mb-8">
            <Link
              href="/shop"
              className="p-2 rounded-xl border border-border hover:border-primary/40 text-muted-foreground hover:text-primary transition-all"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="font-heading text-3xl font-bold gradient-text-pink flex items-center gap-3">
              <Heart className="h-7 w-7 fill-primary text-primary" />
              Wishlist
            </h1>
            {items.length > 0 && (
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                {items.length} item{items.length > 1 ? "s" : ""}
              </span>
            )}
          </div>

          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24"
            >
              <Heart className="h-20 w-20 text-muted-foreground/20 mx-auto mb-6" />
              <h2 className="font-heading text-2xl font-bold text-muted-foreground mb-3">
                Your wishlist is empty
              </h2>
              <p className="text-muted-foreground mb-8">
                Save items you love and come back to them later! 💕
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 hover:shadow-[0_0_25px_oklch(0.72_0.25_320/0.4)] transition-all"
              >
                Browse Products
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <AnimatePresence>
                {items.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.05 }}
                    className="glass-card rounded-2xl border border-border/50 overflow-hidden hover:border-primary/30 transition-all"
                  >
                    <Link href={`/shop/${item.slug}`}>
                      <div className="relative aspect-square overflow-hidden bg-muted/20">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </Link>
                    <div className="p-4">
                      <Link href={`/shop/${item.slug}`}>
                        <h3 className="font-semibold text-foreground mb-1 line-clamp-1 hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                      </Link>
                      <p className="text-primary font-bold mb-3">
                        {formatPrice(item.price)}
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleMoveToCart(item)}
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all"
                        >
                          <ShoppingCart className="h-3.5 w-3.5" />
                          Add to Cart
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 rounded-xl border border-border text-muted-foreground hover:text-destructive hover:border-destructive/40 transition-all"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
