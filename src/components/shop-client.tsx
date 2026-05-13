"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Search, Filter, X, SlidersHorizontal, Grid2X2, LayoutList } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import type { Product } from "@/lib/types";

const CATEGORIES = [
  "All",
  "Keychains",
  "Bag Charms",
  "Phone Charms",
  "Mini Bouquets",
  "Home Décor",
  "Gift Sets",
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name A–Z" },
];

interface ShopClientProps {
  products: Product[];
  dbErrorMessage?: string | null;
}

export function ShopClient({ products, dbErrorMessage }: ShopClientProps) {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") ?? "";
  const initialFilter = searchParams.get("filter") ?? "all";

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [showOnlyInStock, setShowOnlyInStock] = useState(false);
  const [showOnlySale, setShowOnlySale] = useState(initialFilter === "sale");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.tags ?? []).some((t) => t.toLowerCase().includes(q))
      );
    }

    // Filter by type
    if (initialFilter === "featured") result = result.filter((p) => p.isFeatured);
    if (initialFilter === "new") result = result.filter((p) => p.isNewArrival);
    if (initialFilter === "trending") result = result.filter((p) => p.isTrending);

    // Sale filter
    if (showOnlySale) {
      result = result.filter(
        (p) => p.discountedPrice && Number(p.discountedPrice) < Number(p.price)
      );
    }

    // Stock filter
    if (showOnlyInStock) {
      result = result.filter((p) => p.inStock);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return (
            Number(a.discountedPrice ?? a.price) -
            Number(b.discountedPrice ?? b.price)
          );
        case "price-desc":
          return (
            Number(b.discountedPrice ?? b.price) -
            Number(a.discountedPrice ?? a.price)
          );
        case "name-asc":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return result;
  }, [products, searchQuery, selectedCategory, sortBy, showOnlyInStock, showOnlySale, initialFilter]);

  const activeFilterCount = [
    showOnlySale,
    showOnlyInStock,
    selectedCategory !== "All",
  ].filter(Boolean).length;

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Header */}
        <div className="relative py-16 overflow-hidden border-b border-border/50">
          <div className="absolute inset-0 animated-gradient opacity-40" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/10 blur-[80px]" />
          </div>
          <div className="relative container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-heading text-4xl md:text-5xl font-bold gradient-text-pink mb-3"
            >
              Shop All Products
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground"
            >
              {filteredProducts.length} handmade items
            </motion.p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {dbErrorMessage && (
            <div className="mb-6 flex items-start gap-3 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-200">
              <Filter className="mt-0.5 h-4 w-4 shrink-0 text-yellow-400" />
              <div className="space-y-0.5">
                <p className="font-medium text-yellow-100">
                  Product data could not be loaded.
                </p>
                <p className="text-xs text-yellow-200/80">{dbErrorMessage}</p>
              </div>
            </div>
          )}

          {/* Search & Controls */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                id="shop-search-input"
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-card focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_oklch(0.72_0.25_320/0.1)] transition-all text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              id="shop-sort-select"
              className="h-11 px-4 rounded-xl border border-border bg-card text-sm focus:outline-none focus:border-primary transition-all min-w-[180px]"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              id="shop-filter-btn"
              className={`flex items-center gap-2 px-4 h-11 rounded-xl border text-sm font-medium transition-all ${
                showFilters || activeFilterCount > 0
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="flex items-center justify-center h-5 w-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <div className="flex border border-border rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2.5 transition-colors ${
                  viewMode === "grid"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                id="shop-grid-view-btn"
              >
                <Grid2X2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2.5 border-l border-border transition-colors ${
                  viewMode === "list"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                id="shop-list-view-btn"
              >
                <LayoutList className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Expandable Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="glass-card rounded-2xl p-5 mb-6 flex flex-wrap gap-6">
                  {/* Category Filter */}
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-medium">
                      Category
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-3 py-1.5 text-xs rounded-lg border font-medium transition-all ${
                            selectedCategory === cat
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Toggle Filters */}
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-medium">
                      Show Only
                    </p>
                    <div className="flex gap-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={showOnlySale}
                          onChange={(e) => setShowOnlySale(e.target.checked)}
                          className="rounded accent-primary"
                          id="filter-sale-checkbox"
                        />
                        <span className="text-sm text-muted-foreground">
                          On Sale
                        </span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={showOnlyInStock}
                          onChange={(e) => setShowOnlyInStock(e.target.checked)}
                          className="rounded accent-primary"
                          id="filter-instock-checkbox"
                        />
                        <span className="text-sm text-muted-foreground">
                          In Stock Only
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Clear */}
                  {activeFilterCount > 0 && (
                    <button
                      onClick={() => {
                        setSelectedCategory("All");
                        setShowOnlySale(false);
                        setShowOnlyInStock(false);
                      }}
                      className="ml-auto text-xs text-muted-foreground hover:text-destructive flex items-center gap-1 transition-colors"
                    >
                      <X className="h-3 w-3" />
                      Clear filters
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <p className="text-5xl mb-4">🧶</p>
              <h3 className="font-heading text-2xl font-bold text-muted-foreground mb-2">
                No products found
              </h3>
              <p className="text-muted-foreground text-sm">
                Try adjusting your search or filters
              </p>
            </motion.div>
          ) : (
            <div
              className={`grid gap-4 md:gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1"
              }`}
            >
              {filteredProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
