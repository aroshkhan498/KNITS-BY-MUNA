"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Heart,
  Share2,
  Star,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Truck,
  RefreshCw,
  Sparkles,
  ZoomIn,
} from "lucide-react";
import { useCart } from "./cart-context";
import { useWishlist } from "./wishlist-context";
import { formatPrice, getDiscountPercent, generateMessengerUrl, generateOrderMessage } from "@/lib/utils";
import { toast } from "sonner";
import type { Product } from "@/lib/types";

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addItem } = useCart();
  const { isWishlisted, toggleItem } = useWishlist();

  const images = product.images?.length ? product.images : [product.imageUrl];
  const [currentImg, setCurrentImg] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] ?? "");
  const [quantity, setQuantity] = useState(1);
  const [imgError, setImgError] = useState(false);

  const currentPrice = Number(product.discountedPrice ?? product.price);
  const originalPrice = Number(product.price);
  const hasDiscount = !!product.discountedPrice && currentPrice < originalPrice;
  const discountPercent = hasDiscount ? getDiscountPercent(originalPrice, currentPrice) : 0;
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    if (!product.inStock) return;
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        title: product.title,
        price: currentPrice,
        imageUrl: product.imageUrl,
        slug: product.slug ?? product.id,
        selectedColor: selectedColor || undefined,
      });
    }
    toast.success(`${quantity}x ${product.title} added to cart! 🛍️`);
  };

  const handleOrderNow = () => {
    const cartItems = [
      {
        id: product.id,
        title: product.title,
        price: currentPrice,
        imageUrl: product.imageUrl,
        quantity,
        selectedColor,
        slug: product.slug,
      },
    ];
    const msg = generateOrderMessage(cartItems, currentPrice * quantity);
    window.open(generateMessengerUrl(msg), "_blank");
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: product.title,
        text: product.description,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <main className="container mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-primary transition-colors">
          Shop
        </Link>
        <span>/</span>
        <span className="text-foreground line-clamp-1">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden glass-card border border-border/50 cursor-zoom-in group">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImg}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Image
                  src={imgError ? "/logo.png" : images[currentImg]}
                  alt={product.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  onError={() => setImgError(true)}
                />
              </motion.div>
            </AnimatePresence>

            {/* Zoom hint */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm rounded-lg p-2">
              <ZoomIn className="h-4 w-4 text-muted-foreground" />
            </div>

            {/* Discount badge */}
            {hasDiscount && (
              <div className="absolute top-3 left-3 px-3 py-1.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-[0_0_15px_oklch(0.72_0.25_320/0.5)]">
                -{discountPercent}% OFF
              </div>
            )}

            {/* Navigation arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setCurrentImg((p) => (p === 0 ? images.length - 1 : p - 1))
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm border border-border hover:border-primary/50 text-muted-foreground hover:text-primary transition-all"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() =>
                    setCurrentImg((p) => (p === images.length - 1 ? 0 : p + 1))
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm border border-border hover:border-primary/50 text-muted-foreground hover:text-primary transition-all"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail row */}
          {images.length > 1 && (
            <div className="flex gap-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImg(i)}
                  className={`relative h-20 w-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    i === currentImg
                      ? "border-primary shadow-[0_0_10px_oklch(0.72_0.25_320/0.4)]"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {product.isFeatured && (
              <span className="px-2.5 py-1 text-xs rounded-lg bg-primary/10 text-primary border border-primary/20 font-medium">
                ✦ Featured
              </span>
            )}
            {product.isNewArrival && (
              <span className="px-2.5 py-1 text-xs rounded-lg bg-secondary/10 text-secondary border border-secondary/20 font-medium">
                ✦ New
              </span>
            )}
            {product.isTrending && (
              <span className="px-2.5 py-1 text-xs rounded-lg bg-accent/10 text-accent border border-accent/20 font-medium">
                ⚡ Trending
              </span>
            )}
          </div>

          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3 leading-tight">
            {product.title}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-5">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">(5.0) · Handmade with love</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="font-heading text-4xl font-bold gradient-text-pink">
              {formatPrice(currentPrice)}
            </span>
            {hasDiscount && (
              <>
                <span className="text-xl text-muted-foreground line-through">
                  {formatPrice(originalPrice)}
                </span>
                <span className="text-sm text-primary font-medium">
                  Save {formatPrice(originalPrice - currentPrice)}
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-medium text-foreground mb-3">
                Color:{" "}
                <span className="text-primary font-semibold">{selectedColor}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                      selectedColor === color
                        ? "border-primary bg-primary/10 text-primary shadow-[0_0_10px_oklch(0.72_0.25_320/0.2)]"
                        : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <p className="text-sm font-medium text-foreground mb-3">Quantity</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="h-10 w-10 rounded-xl border border-border flex items-center justify-center text-xl hover:border-primary/40 transition-colors"
              >
                −
              </button>
              <span className="text-lg font-bold w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="h-10 w-10 rounded-xl border border-border flex items-center justify-center text-xl hover:border-primary/40 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2 mb-6">
            <div
              className={`h-2 w-2 rounded-full ${product.inStock ? "bg-green-400 shadow-[0_0_6px_#4ade80]" : "bg-destructive"}`}
            />
            <span
              className={`text-sm font-medium ${product.inStock ? "text-green-400" : "text-destructive"}`}
            >
              {product.inStock ? "In Stock — Ready to ship" : "Out of Stock"}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              id="product-add-to-cart-btn"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-primary text-primary-foreground font-bold text-base hover:bg-primary/90 hover:shadow-[0_0_25px_oklch(0.72_0.25_320/0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </button>
            <button
              onClick={() =>
                toggleItem({
                  id: product.id,
                  title: product.title,
                  price: currentPrice,
                  imageUrl: product.imageUrl,
                  slug: product.slug ?? product.id,
                })
              }
              id="product-wishlist-btn"
              className={`p-3.5 rounded-2xl border-2 transition-all duration-300 ${
                wishlisted
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/50 hover:text-primary"
              }`}
              aria-label="Add to wishlist"
            >
              <Heart className={`h-5 w-5 ${wishlisted ? "fill-current" : ""}`} />
            </button>
            <button
              onClick={handleShare}
              id="product-share-btn"
              className="p-3.5 rounded-2xl border-2 border-border text-muted-foreground hover:border-secondary/50 hover:text-secondary transition-all duration-300"
              aria-label="Share product"
            >
              <Share2 className="h-5 w-5" />
            </button>
          </div>

          {/* Order via Messenger */}
          <button
            onClick={handleOrderNow}
            id="product-order-now-btn"
            disabled={!product.inStock}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl border-2 border-secondary/40 text-secondary font-bold text-base hover:bg-secondary/10 hover:border-secondary/60 hover:shadow-[0_0_20px_oklch(0.65_0.22_255/0.2)] transition-all duration-300 disabled:opacity-50"
          >
            <MessageCircle className="h-5 w-5" />
            Order via Messenger
          </button>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-border/50">
            {[
              { icon: Sparkles, label: "100% Handmade" },
              { icon: Truck, label: "Fast Delivery" },
              { icon: RefreshCw, label: "Custom Orders" },
            ].map((f) => (
              <div
                key={f.label}
                className="flex flex-col items-center gap-2 text-center"
              >
                <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground font-medium">
                  {f.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </main>
  );
}
