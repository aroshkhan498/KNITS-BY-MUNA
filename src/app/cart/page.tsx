"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  ArrowLeft,
  ShoppingBag,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useCart } from "@/components/cart-context";
import { formatPrice, generateMessengerUrl, generateOrderMessage } from "@/lib/utils";
import { toast } from "sonner";

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, total } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [isOrdering, setIsOrdering] = useState(false);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  const handleOrder = () => {
    if (items.length === 0) return;
    setIsOrdering(true);

    const msg = generateOrderMessage(items, total, customerName || undefined, notes || undefined);
    const url = generateMessengerUrl(msg);
    window.open(url, "_blank");

    setTimeout(() => {
      setIsOrdering(false);
    }, 2000);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-3 mb-8">
            <Link
              href="/shop"
              className="p-2 rounded-xl border border-border hover:border-primary/40 text-muted-foreground hover:text-primary transition-all"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="font-heading text-3xl font-bold gradient-text-pink">
              Your Cart
            </h1>
            {itemCount > 0 && (
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                {itemCount} item{itemCount > 1 ? "s" : ""}
              </span>
            )}
          </div>

          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24"
            >
              <ShoppingBag className="h-20 w-20 text-muted-foreground/30 mx-auto mb-6" />
              <h2 className="font-heading text-2xl font-bold text-muted-foreground mb-3">
                Your cart is empty
              </h2>
              <p className="text-muted-foreground mb-8">
                Looks like you haven't added anything yet! 🌸
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 hover:shadow-[0_0_25px_oklch(0.72_0.25_320/0.4)] transition-all"
              >
                <ShoppingCart className="h-5 w-5" />
                Browse Products
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">
                    {itemCount} item{itemCount > 1 ? "s" : ""} in your cart
                  </span>
                  <button
                    onClick={() => {
                      clearCart();
                      toast("Cart cleared");
                    }}
                    className="text-xs text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1"
                  >
                    <Trash2 className="h-3 w-3" />
                    Clear all
                  </button>
                </div>

                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="glass-card rounded-2xl p-4 flex gap-4 border border-border/50"
                    >
                      <div className="relative h-24 w-24 rounded-xl overflow-hidden shrink-0 border border-border/50">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground leading-tight mb-0.5 line-clamp-1">
                          {item.title}
                        </h3>
                        {item.selectedColor && (
                          <p className="text-xs text-muted-foreground mb-2">
                            Color: {item.selectedColor}
                          </p>
                        )}
                        <p className="text-primary font-bold">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                      <div className="flex flex-col items-end justify-between shrink-0">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="h-8 w-8 rounded-lg border border-border flex items-center justify-center hover:border-primary/40 transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-sm font-bold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="h-8 w-8 rounded-lg border border-border flex items-center justify-center hover:border-primary/40 transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <p className="text-sm font-bold text-foreground">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="glass-card rounded-2xl p-6 border border-primary/20 sticky top-24 space-y-5">
                  <h2 className="font-heading text-xl font-bold text-foreground">
                    Order Summary
                  </h2>

                  <div className="space-y-2 text-sm">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between text-muted-foreground"
                      >
                        <span className="line-clamp-1 flex-1 mr-2">
                          {item.title} ×{item.quantity}
                        </span>
                        <span>{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border/50 pt-3 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="gradient-text-pink text-2xl">
                      {formatPrice(total)}
                    </span>
                  </div>

                  {/* Customer Info */}
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                      Your Info (Optional)
                    </p>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      id="cart-customer-name"
                      className="w-full h-10 px-3 text-sm rounded-xl border border-border bg-background focus:outline-none focus:border-primary transition-colors"
                    />
                    <input
                      type="tel"
                      placeholder="Phone number"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      id="cart-customer-phone"
                      className="w-full h-10 px-3 text-sm rounded-xl border border-border bg-background focus:outline-none focus:border-primary transition-colors"
                    />
                    <textarea
                      placeholder="Any special notes..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={2}
                      id="cart-order-notes"
                      className="w-full px-3 py-2 text-sm rounded-xl border border-border bg-background focus:outline-none focus:border-primary transition-colors resize-none"
                    />
                  </div>

                  <button
                    onClick={handleOrder}
                    disabled={isOrdering}
                    id="cart-place-order-btn"
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 hover:shadow-[0_0_30px_oklch(0.72_0.25_320/0.5)] transition-all duration-300 disabled:opacity-70"
                  >
                    <MessageCircle className="h-5 w-5" />
                    {isOrdering ? "Opening Messenger..." : "Place Order via Messenger"}
                  </button>

                  <p className="text-xs text-muted-foreground text-center">
                    You'll be redirected to Facebook Messenger to complete your order. No payment required online.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
