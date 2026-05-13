import type { Metadata } from "next";
import { db } from "@/db";
import { products } from "@/db/schema";
import { desc } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { AdminDeleteButton } from "@/components/admin-delete-button";
import { Badge } from "@/components/ui/badge";
import {
  Package2,
  Plus,
  LayoutDashboard,
  TrendingUp,
  DollarSign,
  AlertCircle,
} from "lucide-react";

export const metadata: Metadata = { title: "Admin Dashboard – Knits by Muna" };
export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  let allProducts: any[] = [];
  let dbConnected = false;
  let dbErrorMessage = "";

  try {
    allProducts = await db.select().from(products).orderBy(desc(products.createdAt));
    dbConnected = true;
  } catch (error: any) {
    allProducts = [];
    dbErrorMessage =
      error?.message ||
      "Unknown database error. Check connection string and schema.";
  }

  const totalProducts = allProducts.length;
  const inStockCount = allProducts.filter((p) => p.inStock).length;
  const onSaleCount = allProducts.filter((p) => p.discountedPrice).length;

  return (
    <div className="space-y-8">
      {/* DB Status warning */}
      {!dbConnected && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 text-sm">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <div className="space-y-0.5">
            <p>Database query failed. Check your connection string and run the database schema.</p>
            <p className="text-xs text-yellow-400/80">{dbErrorMessage}</p>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Products", value: totalProducts, icon: Package2, color: "text-primary border-primary/20 bg-primary/10" },
          { label: "In Stock", value: inStockCount, icon: TrendingUp, color: "text-green-400 border-green-500/20 bg-green-500/10" },
          { label: "On Sale", value: onSaleCount, icon: DollarSign, color: "text-secondary border-secondary/20 bg-secondary/10" },
        ].map((stat) => (
          <div key={stat.label} className={`rounded-2xl border p-5 ${stat.color} flex items-center gap-4`}>
            <div className="p-3 rounded-xl bg-current/10">
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-3xl font-bold font-heading">{stat.value}</p>
              <p className="text-xs opacity-70 font-medium mt-0.5">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-2xl font-bold text-foreground">
          All Products
        </h2>
        <Link
          href="/admin/new"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 hover:shadow-[0_0_20px_oklch(0.72_0.25_320/0.4)] transition-all"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </Link>
      </div>

      {/* Products Table */}
      <div className="glass-card rounded-2xl border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50 bg-muted/20">
                <th className="text-left px-4 py-3 text-xs uppercase tracking-widest text-muted-foreground font-medium">
                  Product
                </th>
                <th className="text-left px-4 py-3 text-xs uppercase tracking-widest text-muted-foreground font-medium hidden sm:table-cell">
                  Price
                </th>
                <th className="text-left px-4 py-3 text-xs uppercase tracking-widest text-muted-foreground font-medium hidden md:table-cell">
                  Sale Price
                </th>
                <th className="text-left px-4 py-3 text-xs uppercase tracking-widest text-muted-foreground font-medium">
                  Status
                </th>
                <th className="text-right px-4 py-3 text-xs uppercase tracking-widest text-muted-foreground font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {allProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-muted-foreground text-sm">
                    No products yet. Add your first product!
                  </td>
                </tr>
              ) : (
                allProducts.map((product: any) => (
                  <tr
                    key={product.id}
                    className="border-b border-border/30 hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 rounded-xl overflow-hidden border border-border/50 shrink-0">
                          <Image
                            src={product.imageUrl}
                            alt={product.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground text-sm line-clamp-1">
                            {product.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            ID: {String(product.id)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden sm:table-cell">
                      <span className="text-sm text-foreground font-medium">
                        ৳{Number(product.price).toFixed(0)}
                      </span>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      {product.discountedPrice ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                          ৳{Number(product.discountedPrice).toFixed(0)}
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      {product.inStock ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-green-500/10 text-green-400 text-xs font-medium border border-green-500/20">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                          In Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-destructive/10 text-destructive text-xs font-medium border border-destructive/20">
                          <span className="h-1.5 w-1.5 rounded-full bg-destructive" />
                          Out of Stock
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/edit/${product.id}`}
                          className="px-3 py-1.5 rounded-lg border border-border text-sm text-muted-foreground hover:border-primary/40 hover:text-primary transition-all"
                        >
                          Edit
                        </Link>
                        <AdminDeleteButton productId={String(product.id)} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
