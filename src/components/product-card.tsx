"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Eye, Star, Zap } from "lucide-react";
import { useCart } from "./cart-context";
import { useWishlist } from "./wishlist-context";
import { cn, formatPrice, getDiscountPercent } from "@/lib/utils";
import type { Product } from "@/lib/types";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();
  const { isWishlisted, toggleItem } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const updateCanHover = () => setCanHover(mediaQuery.matches);
    updateCanHover();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updateCanHover);
      return () => mediaQuery.removeEventListener("change", updateCanHover);
    }

    mediaQuery.addListener(updateCanHover);
    return () => mediaQuery.removeListener(updateCanHover);
  }, []);

  const currentPrice = Number(product.discountedPrice ?? product.price);
  const originalPrice = Number(product.price);
  const hasDiscount = !!product.discountedPrice && currentPrice < originalPrice;
  const discountPercent = hasDiscount ? getDiscountPercent(originalPrice, currentPrice) : 0;
  const wishlisted = isWishlisted(product.id);
  const slug = product.slug ?? product.id;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!product.inStock) return;
    addItem({
      id: product.id,
      title: product.title,
      price: currentPrice,
      imageUrl: product.imageUrl,
      slug,
    });
    toast.success(`${product.title} added to cart! 🛍️`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleItem({
      id: product.id,
      title: product.title,
      price: currentPrice,
      imageUrl: product.imageUrl,
      slug,
    });
    toast(wishlisted ? "Removed from wishlist" : "Added to wishlist! 💕");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
      onMouseEnter={canHover ? () => setIsHovered(true) : undefined}
      onMouseLeave={canHover ? () => setIsHovered(false) : undefined}
      className="group relative"
    >
      <Link href={`/shop/${slug}`} className="block">
        <div
          className={cn(
            "glass-card rounded-2xl overflow-hidden transition-all duration-500",
            isHovered
              ? "border-primary/40 shadow-[0_8px_40px_oklch(0.72_0.25_320/0.2),0_0_0_1px_oklch(0.72_0.25_320/0.2)]"
              : "border-border/50"
          )}
        >
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-muted/20">
            <Image
              src={imgError ? "/logo.png" : (product.imageUrl && product.imageUrl.trim() !== "" ? product.imageUrl : "/logo.png")}
              alt={product.title}
              fill
              className={cn(
                "object-cover transition-transform duration-700",
                isHovered ? "scale-110" : "scale-100"
              )}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              onError={() => setImgError(true)}
            />

            {/* Overlay gradient on hover */}
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent transition-opacity duration-300",
                isHovered ? "opacity-100" : "opacity-0"
              )}
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {hasDiscount && (
                <span className="px-2 py-1 text-xs font-bold rounded-lg bg-primary text-primary-foreground shadow-[0_0_10px_oklch(0.72_0.25_320/0.5)]">
                  -{discountPercent}%
                </span>
              )}
              {product.isNewArrival && !hasDiscount && (
                <span className="px-2 py-1 text-xs font-bold rounded-lg bg-secondary text-secondary-foreground shadow-[0_0_10px_oklch(0.65_0.22_255/0.5)]">
                  NEW
                </span>
              )}
              {product.isTrending && (
                <span className="px-2 py-1 text-xs font-bold rounded-lg bg-accent text-accent-foreground flex items-center gap-1">
                  <Zap className="h-2.5 w-2.5" /> HOT
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div
              className={cn(
                "absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300",
                isHovered
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-4"
              )}
            >
              <button
                onClick={handleWishlist}
                id={`wishlist-${product.id}`}
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                className={cn(
                  "flex items-center justify-center h-9 w-9 rounded-xl border transition-all duration-200",
                  wishlisted
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card/80 text-muted-foreground border-border/50 hover:border-primary/50 hover:text-primary backdrop-blur-sm"
                )}
              >
                <Heart
                  className={cn("h-4 w-4", wishlisted && "fill-current")}
                />
              </button>
              <Link
                href={`/shop/${slug}`}
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center h-9 w-9 rounded-xl border bg-card/80 text-muted-foreground border-border/50 hover:border-primary/50 hover:text-primary backdrop-blur-sm transition-all duration-200"
                aria-label="Quick view"
              >
                <Eye className="h-4 w-4" />
              </Link>
            </div>

            {/* Out of Stock Overlay */}
            {!product.inStock && (
              <div className="absolute inset-0 bg-background/70 backdrop-blur-sm flex items-center justify-center">
                <span className="px-4 py-2 rounded-xl border-2 border-muted-foreground/50 text-muted-foreground font-bold text-sm -rotate-12">
                  OUT OF STOCK
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Rating placeholder */}
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3 w-3",
                    i < Math.round(product.rating ?? 5) ? "fill-primary text-primary" : "text-muted-foreground"
                  )}
                />
              ))}
              <span className="text-xs text-muted-foreground ml-1">({product.rating ?? 5.0})</span>
            </div>

            <h3 className="font-heading font-semibold text-base leading-tight mb-1 line-clamp-1 text-foreground">
              {product.title}
            </h3>

            <p className="text-xs text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
              {product.description}
            </p>

            {/* Price */}
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <span
                  className={cn(
                    "font-bold text-lg",
                    hasDiscount ? "text-primary" : "text-foreground"
                  )}
                >
                  {formatPrice(currentPrice)}
                </span>
                {hasDiscount && (
                  <span className="text-xs text-muted-foreground line-through">
                    {formatPrice(originalPrice)}
                  </span>
                )}
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                id={`add-to-cart-${product.id}`}
                aria-label={`Add ${product.title} to cart`}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300",
                  product.inStock
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_15px_oklch(0.72_0.25_320/0.4)]"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                )}
              >
                <ShoppingCart className="h-3.5 w-3.5" />
                Add
              </button>
            </div>

            {/* Color swatches */}
            {product.colors && product.colors.length > 0 && (
              <div className="flex items-center gap-1.5 mt-3">
                <span className="text-xs text-muted-foreground">Colors:</span>
                <div className="flex gap-1">
                  {product.colors.slice(0, 5).map((color) => (
                    <span
                      key={color}
                      className="h-4 w-4 rounded-full border border-border text-[8px] leading-[16px] text-center text-muted-foreground overflow-hidden"
                      title={color}
                      style={{
                        background: getColorHex(color),
                      }}
                    />
                  ))}
                  {product.colors.length > 5 && (
                    <span className="text-[10px] text-muted-foreground self-center">
                      +{product.colors.length - 5}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function getColorHex(colorName: string): string {
  const map: Record<string, string> = {
    red: "#ef4444",
    pink: "#ec4899",
    purple: "#a855f7",
    blue: "#3b82f6",
    lavender: "#c4b5fd",
    white: "#f8fafc",
    yellow: "#eab308",
    orange: "#f97316",
    green: "#22c55e",
    mixed: "linear-gradient(135deg, #ec4899, #8b5cf6, #3b82f6)",
    pastel: "linear-gradient(135deg, #fda4af, #c4b5fd, #93c5fd)",
    vibrant: "linear-gradient(135deg, #ef4444, #f97316, #eab308)",
  };
  return map[colorName.toLowerCase()] ?? "#6366f1";
}
