// Central types for the entire application
export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  imageUrl?: string | null;
  sortOrder: number;
  createdAt?: Date;
};

export type Product = {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number | string;
  discountedPrice?: number | string | null;
  imageUrl: string;
  images?: string[];
  categoryId?: string | null;
  category?: Category | null;
  inStock: boolean;
  isFeatured: boolean;
  isNewArrival: boolean;
  isTrending: boolean;
  colors?: string[];
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
};

export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
  selectedColor?: string;
  slug?: string;
};

export type WishlistItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  slug: string;
};

export type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  message: string;
  productId?: string | null;
  status: "new" | "read" | "replied";
  createdAt?: Date;
};

export type OrderMessage = {
  items: CartItem[];
  total: number;
  customerName?: string;
  customerPhone?: string;
  notes?: string;
};

// Seed / sample products for when DB is unavailable
export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "sample-1",
    title: "Sunflower Bag Charm",
    slug: "sunflower-bag-charm",
    description:
      "A gorgeous handmade crochet sunflower charm. Perfect for brightening up any bag, backpack, or keys. Each piece is lovingly handcrafted.",
    price: 15.0,
    discountedPrice: 12.0,
    imageUrl: "/logo.png",
    inStock: true,
    isFeatured: true,
    isNewArrival: false,
    isTrending: true,
    colors: ["Yellow", "Pink", "Orange"],
    tags: ["charm", "sunflower", "bag"],
  },
  {
    id: "sample-2",
    title: "Crochet Flower Keychain",
    slug: "crochet-flower-keychain",
    description:
      "Adorable handmade crochet flower keychain. A perfect accessory and gift for someone special.",
    price: 10.0,
    discountedPrice: null,
    imageUrl: "/logo.png",
    inStock: true,
    isFeatured: true,
    isNewArrival: true,
    isTrending: false,
    colors: ["Red", "Purple", "Pink", "White"],
    tags: ["keychain", "flower", "gift"],
  },
  {
    id: "sample-3",
    title: "Mini Tulip Bouquet",
    slug: "mini-tulip-bouquet",
    description:
      "Delicate mini tulip bouquet crafted with premium yarn. A beautiful everlasting floral piece for home décor.",
    price: 25.0,
    discountedPrice: null,
    imageUrl: "/logo.png",
    inStock: true,
    isFeatured: true,
    isNewArrival: true,
    isTrending: true,
    colors: ["Mixed", "Pink", "Red"],
    tags: ["bouquet", "tulip", "decor"],
  },
  {
    id: "sample-4",
    title: "Phone Charm Accessory",
    slug: "phone-charm-accessory",
    description:
      "Cute little crochet charm for your phone strap. Makes your phone uniquely yours.",
    price: 8.0,
    discountedPrice: 6.0,
    imageUrl: "/logo.png",
    inStock: true,
    isFeatured: false,
    isNewArrival: false,
    isTrending: true,
    colors: ["Blue", "Pink", "Lavender", "White"],
    tags: ["phone", "charm", "accessory"],
  },
  {
    id: "sample-5",
    title: "Crochet Cherry Keychain",
    slug: "crochet-cherry-keychain",
    description:
      "The sweetest little cherry keychain you'll ever own. Handmade with soft yarn and a shiny finish.",
    price: 10.0,
    discountedPrice: null,
    imageUrl: "/logo.png",
    inStock: false,
    isFeatured: false,
    isNewArrival: false,
    isTrending: false,
    colors: ["Red", "Pink"],
    tags: ["keychain", "cherry", "fruit"],
  },
  {
    id: "sample-6",
    title: "Mini Crochet Bouquet",
    slug: "mini-crochet-bouquet",
    description:
      "A mini bouquet of assorted crochet flowers. Perfect as a gift or as a charming home decoration.",
    price: 30.0,
    discountedPrice: 24.0,
    imageUrl: "/logo.png",
    inStock: true,
    isFeatured: true,
    isNewArrival: true,
    isTrending: false,
    colors: ["Mixed", "Pastel", "Vibrant"],
    tags: ["bouquet", "gift", "flowers"],
  },
];

export const SAMPLE_CATEGORIES = [
  {
    id: "cat-1",
    name: "Keychains",
    slug: "keychains",
    description: "Handmade crochet keychains",
    imageUrl: "/logo.png",
    sortOrder: 1,
  },
  {
    id: "cat-2",
    name: "Bag Charms",
    slug: "bag-charms",
    description: "Beautiful bag accessories",
    imageUrl: "/logo.png",
    sortOrder: 2,
  },
  {
    id: "cat-3",
    name: "Phone Charms",
    slug: "phone-charms",
    description: "Cute phone accessories",
    imageUrl: "/logo.png",
    sortOrder: 3,
  },
  {
    id: "cat-4",
    name: "Mini Bouquets",
    slug: "mini-bouquets",
    description: "Everlasting floral pieces",
    imageUrl: "/logo.png",
    sortOrder: 4,
  },
  {
    id: "cat-5",
    name: "Home Décor",
    slug: "home-decor",
    description: "Crochet home decorations",
    imageUrl: "/logo.png",
    sortOrder: 5,
  },
  {
    id: "cat-6",
    name: "Gift Sets",
    slug: "gift-sets",
    description: "Curated gift collections",
    imageUrl: "/logo.png",
    sortOrder: 6,
  },
];

export function generateOrderMessage(
  items: CartItem[],
  total: number,
  customerName?: string,
  notes?: string
): string {
  let message = `🌸 Hello Knits by Muna!\n\nI'd like to place an order:\n\n`;

  if (customerName) {
    message += `👤 Name: ${customerName}\n\n`;
  }

  message += `🛍️ Order Details:\n`;
  items.forEach((item) => {
    message += `• ${item.quantity}x ${item.title}`;
    if (item.selectedColor) message += ` (${item.selectedColor})`;
    message += ` — ৳${(item.price * item.quantity).toFixed(0)}\n`;
  });

  message += `\n💰 Total: ৳${total.toFixed(0)}\n`;

  if (notes) {
    message += `\n📝 Notes: ${notes}\n`;
  }

  message += `\nThank you! 🌺`;
  return message;
}
