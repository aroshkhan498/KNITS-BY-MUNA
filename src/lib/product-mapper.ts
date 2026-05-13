import type { Product } from "@/lib/types";
import type { products } from "@/db/schema";
import { generateRandomRating } from "@/lib/utils";

type ProductRow = typeof products.$inferSelect;

const FALLBACK_IMAGES = [
  "/sunflower.jpeg",
  "/hero_desktop.png",
  "/Pretty in Pink Crochet Mini-Bouquets.jpeg",
  "/Radiant Peony Crochet Hair Clip.jpeg",
  "/Pastel Garden Crochet Tulip Bouquet.jpeg",
  "/Everlasting Bloom Mini-Bouquet Keychains.jpeg",
  "/Strawberry Blossom Crochet Charm.jpeg",
];

function fallbackImageForId(id: string) {
  // simple stable selection using char codes
  let sum = 0;
  for (let i = 0; i < id.length; i++) sum += id.charCodeAt(i);
  return FALLBACK_IMAGES[sum % FALLBACK_IMAGES.length];
}

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
    // prefer stored imageUrl, otherwise select a public product photo fallback
    imageUrl: row.imageUrl ?? fallbackImageForId(id),
    images: row.imageUrl ? [row.imageUrl] : [fallbackImageForId(id)],
    colors: [],
    tags: [],
  };
}
