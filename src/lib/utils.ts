import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number | string): string {
  return `৳${Number(price).toFixed(0)}`;
}

export function getDiscountPercent(
  original: number | string,
  discounted: number | string
): number {
  const orig = Number(original);
  const disc = Number(discounted);
  if (!orig || !disc) return 0;
  return Math.round(((orig - disc) / orig) * 100);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function generateMessengerUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  // Facebook Page Messenger link for Knits by Muna
  return `https://m.me/knitsbymuna?text=${encoded}`;
}

export function generateInstagramDMUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://ig.me/m/knitsbymuna?text=${encoded}`;
}
