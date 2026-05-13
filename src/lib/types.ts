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

export function generateOrderMessage(
  items: CartItem[],
  total: number,
  customerName?: string,
  notes?: string
): string {
  let message = "Hello Knits by Muna!\n\nI'd like to place an order:\n\n";

  if (customerName) {
    message += `Name: ${customerName}\n\n`;
  }

  message += "Order Details:\n";
  items.forEach((item) => {
    message += `- ${item.quantity}x ${item.title}`;
    if (item.selectedColor) message += ` (${item.selectedColor})`;
    message += ` - Tk ${Number(item.price * item.quantity).toFixed(0)}\n`;
  });

  message += `\nTotal: Tk ${total.toFixed(0)}\n`;

  if (notes) {
    message += `\nNotes: ${notes}\n`;
  }

  message += "\nThank you!";
  return message;
}
