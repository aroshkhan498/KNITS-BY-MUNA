export type CategoryCatalogItem = {
  slug: string;
  name: string;
  emoji: string;
  description: string;
};

export const CATEGORY_CATALOG: CategoryCatalogItem[] = [
  {
    slug: "keychains",
    name: "Crochet Keychains",
    emoji: "🔑",
    description:
      "Adorable handmade keychains in various flower, fruit, and character designs. Perfect for bags, keys, and gifts.",
  },
  {
    slug: "bag-charms",
    name: "Bag Charms",
    emoji: "👜",
    description:
      "Beautiful crochet bag accessories that add a unique touch to your handbag, backpack, or tote.",
  },
  {
    slug: "phone-charms",
    name: "Phone Charms",
    emoji: "📱",
    description:
      "Tiny crochet charms to attach to your phone strap or phone case. Make your phone one-of-a-kind.",
  },
  {
    slug: "mini-bouquets",
    name: "Mini Bouquets",
    emoji: "💐",
    description:
      "Everlasting handmade floral arrangements. Perfect for home décor, gifts, and special occasions.",
  },
  {
    slug: "home-decor",
    name: "Home Décor",
    emoji: "🏠",
    description:
      "Handmade crochet decorations to add warmth and character to your living spaces.",
  },
  {
    slug: "gift-sets",
    name: "Gift Sets",
    emoji: "🎁",
    description:
      "Curated crochet gift collections, perfect for birthdays, Eid, anniversaries, and any celebration.",
  },
];
