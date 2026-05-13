import type { Product } from "@/lib/types";
import type { products } from "@/db/schema";
import { generateRandomRating } from "@/lib/utils";

type ProductRow = typeof products.$inferSelect;

export function toProduct(row: ProductRow): Product {
  const id = String(row.id);

  return {
    ...row,
    id,
    price: Number(row.price),
    discountedPrice: row.discountedPrice ? Number(row.discountedPrice) : null,
    slug: id,
    isFeatured: row.isFeatured,
    isNewArrival: row.isNewArrival,
    isTrending: row.isTrending,
    rating: generateRandomRating(),
    images: row.imageUrl ? [row.imageUrl] : [],
    colors: [],
    tags: [],
  };
}
