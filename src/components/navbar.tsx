"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Heart,
  Search,
  Menu,
  X,
  Sparkles,
  Send,
} from "lucide-react";
import { useCart } from "./cart-context";
import { useWishlist } from "./wishlist-context";
import { FacebookIcon, InstagramIcon } from "./icons/social";
import { cn, generateMessengerUrl } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About" },
  { href: "/custom-order", label: "Custom Order" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const { items: cartItems } = useCart();
  const { count: wishlistCount } = useWishlist();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "glass border-b border-primary/20 shadow-[0_4px_30px_oklch(0.72_0.25_320/0.1)]"
            : "bg-transparent"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 md:h-20 items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className="relative h-10 w-10 md:h-12 md:w-12 rounded-full overflow-hidden border-2 border-primary/50 group-hover:border-primary transition-all duration-300 animate-pulse-glow">
                <Image
                  src="/logo.png"
                  alt="Knits by Muna"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <span className="font-heading font-bold text-lg md:text-2xl tracking-wide gradient-text-pink drop-shadow hidden sm:block">
                Knits by Muna
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                    pathname === link.href
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {pathname === link.href && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-lg bg-primary/10 border border-primary/30"
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
                aria-label="Search products"
                id="navbar-search-btn"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
                aria-label={`Wishlist (${wishlistCount} items)`}
                id="navbar-wishlist-btn"
              >
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold"
                  >
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </motion.span>
                )}
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
                aria-label={`Cart (${cartCount} items)`}
                id="navbar-cart-btn"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center rounded-full bg-secondary text-secondary-foreground text-[10px] font-bold"
                  >
                    {cartCount > 9 ? "9+" : cartCount}
                  </motion.span>
                )}
              </Link>

              {/* Desktop Social Links & CTA */}
              <div className="hidden lg:flex items-center gap-3 pl-2 border-l border-border/50">
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/knitsbymuna"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow on Instagram"
                  className="flex items-center justify-center h-10 w-10 rounded-full border border-border/60 hover:border-secondary/50 hover:bg-secondary/10 text-muted-foreground hover:text-secondary transition-all duration-300"
                >
                  <InstagramIcon className="h-5 w-5" />
                </a>

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/profile.php?id=61588396945080"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow on Facebook"
                  className="flex items-center justify-center h-10 w-10 rounded-full border border-border/60 hover:border-primary/50 hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all duration-300"
                >
                  <FacebookIcon className="h-5 w-5" />
                </a>

                {/* Order via DM Button */}
                <button
                  onClick={() => {
                    const msg = "Hi! I'd like to place an order 💕";
                    window.open(generateMessengerUrl(msg), "_blank");
                  }}
                  className="hidden xl:flex items-center gap-2 px-5 py-2 rounded-full border border-primary/40 bg-primary/5 text-primary font-medium text-sm hover:bg-primary/15 hover:border-primary/60 transition-all duration-300 hover:shadow-[0_0_20px_oklch(0.72_0.25_320/0.2)]"
                  aria-label="Order via Messenger DM"
                >
                  <Send className="h-4 w-4" />
                  Order via DM
                </button>
              </div>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
                aria-label="Toggle mobile menu"
                id="navbar-mobile-menu-btn"
              >
                {isMobileOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 glass border-b border-primary/20 lg:hidden"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                    pathname === link.href
                      ? "bg-primary/10 text-primary border border-primary/30"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-lg flex items-start justify-center pt-24 px-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsSearchOpen(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.95, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -20 }}
              className="w-full max-w-2xl"
            >
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search for crochet keychains, charms, bouquets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-14 pl-12 pr-4 text-lg bg-card border border-primary/40 rounded-2xl focus:outline-none focus:border-primary focus:shadow-[0_0_20px_oklch(0.72_0.25_320/0.2)] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-md text-muted-foreground hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </form>
              <div className="mt-4 flex gap-2 flex-wrap">
                {["Keychain", "Bag Charm", "Phone Charm", "Bouquet", "Tulip"].map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      window.location.href = `/shop?search=${encodeURIComponent(s)}`;
                      setIsSearchOpen(false);
                    }}
                    className="px-3 py-1.5 text-sm rounded-full border border-border hover:border-primary/50 hover:bg-primary/10 text-muted-foreground hover:text-foreground transition-all"
                  >
                    <Sparkles className="inline h-3 w-3 mr-1" />
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-16 md:h-20" />
    </>
  );
}
