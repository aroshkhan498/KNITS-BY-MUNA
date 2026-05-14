import type { Product } from "@/lib/types";

const fallbackProduct = (
  id: string,
  title: string,
  description: string,
  imageUrl: string,
  price: number,
  options: Partial<Product> = {}
): Product => ({
  id,
  title,
  slug: id,
  description,
  price,
  discountedPrice: options.discountedPrice ?? null,
  imageUrl,
  images: [imageUrl],
  categoryId: options.categoryId ?? null,
  category: options.category ?? null,
  inStock: options.inStock ?? true,
  isFeatured: options.isFeatured ?? true,
  isNewArrival: options.isNewArrival ?? false,
  isTrending: options.isTrending ?? false,
  rating: options.rating ?? 5,
  colors: options.colors ?? [],
  tags: options.tags ?? [],
});

export const FALLBACK_PRODUCTS: Product[] = [
  fallbackProduct(
    "1001",
    "Sunflower Bouquet",
    "A bright handmade bouquet with cheerful sunflower tones and a soft, gift-ready finish.",
    "/Sunflower Bouquet.jpeg",
    950,
    { isFeatured: true, isNewArrival: true, rating: 4.9 }
  ),
  fallbackProduct(
    "1002",
    "Pretty in Pink Mini-Bouquets",
    "Delicate pastel blooms arranged as a petite bouquet for gifting or display.",
    "/Pretty in Pink Crochet Mini-Bouquets.jpeg",
    1200,
    { isFeatured: true, isTrending: true, rating: 5 }
  ),
  fallbackProduct(
    "1003",
    "Radiant Peony Hair Clip",
    "A soft floral clip with a polished handmade texture and elegant everyday wear.",
    "/Radiant Peony Crochet Hair Clip.jpeg",
    650,
    { isFeatured: true, isNewArrival: true, rating: 4.8 }
  ),
  fallbackProduct(
    "1004",
    "Strawberry Blossom Charm",
    "A playful charm with fruit-and-flower styling for bags, keys, and phones.",
    "/Strawberry Blossom Crochet Charm.jpeg",
    500,
    { isFeatured: true, isTrending: true, rating: 4.9 }
  ),
  fallbackProduct(
    "1005",
    "Everlasting Bloom Keychains",
    "A small bouquet-inspired keychain set made for gifting and daily use.",
    "/Everlasting Bloom Mini-Bouquet Keychains.jpeg",
    800,
    { isFeatured: true, isNewArrival: true, rating: 5 }
  ),
  fallbackProduct(
    "1006",
    "Pastel Garden Tulip Bouquet",
    "A soft tulip arrangement with garden-inspired color play and a premium finish.",
    "/Pastel Garden Crochet Tulip Bouquet.jpeg",
    1350,
    { isFeatured: true, discountedPrice: 1150, rating: 4.7 }
  ),
  fallbackProduct(
    "1007",
    "Wildflower Meadow Hair Vine",
    "An airy floral vine accessory designed to add a whimsical touch to special looks.",
    "/Wildflower Meadow Crochet Hair Vine.jpeg",
    1100,
    { isFeatured: true, isTrending: true, rating: 4.8 }
  ),
  fallbackProduct(
    "1008",
    "Blossom & Pearl Hair Vine",
    "A romantic handmade hair accessory with pearl-like accents and floral detail.",
    "/Blossom & Pearl Crochet Hair Vine.jpeg",
    1250,
    { isFeatured: true, discountedPrice: 990, rating: 4.9 }
  ),
];

export function getFallbackProductById(id: string) {
  return FALLBACK_PRODUCTS.find((product) => product.id === id) ?? null;
}