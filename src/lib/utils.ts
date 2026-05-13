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
  return `https://m.me/61588396945080?text=${encoded}`;
}

export function generateInstagramDMUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://ig.me/m/knitsbymuna?text=${encoded}`;
}

export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function generateRandomRating(): number {
  // Generate a random rating between 4.0 and 5.0 with 1 decimal place
  const min = 4.0;
  const max = 5.0;
  return Math.round((Math.random() * (max - min) + min) * 10) / 10;
}

export { generateOrderMessage } from "./types";
