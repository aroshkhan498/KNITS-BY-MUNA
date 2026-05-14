import type { Metadata } from "next";
import { Inter, Outfit, Playball, Cormorant_Garamond } from "next/font/google";
import { Toaster } from "sonner";
import { CartProvider } from "@/components/cart-context";
import { WishlistProvider } from "@/components/wishlist-context";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const playball = Playball({
  subsets: ["latin"],
  variable: "--font-playball",
  weight: "400",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://knitsbymuna.vercel.app"),
  title: {
    default: "Knits by Muna – Handmade Crochet Accessories",
    template: "%s | Knits by Muna",
  },
  description:
    "Premium handmade crochet accessories from Bangladesh. Flower keychains, bag charms, phone charms, mini bouquets & more. Unique, handcrafted with love.",
  keywords: [
    "crochet",
    "handmade",
    "keychain",
    "bag charm",
    "phone charm",
    "crochet flower",
    "Bangladesh handmade",
    "crochet accessories",
    "knits by muna",
  ],
  authors: [{ name: "Knits by Muna" }],
  creator: "Knits by Muna",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://knitsbymuna.vercel.app",
    title: "Knits by Muna – Handmade Crochet Accessories",
    description:
      "Premium handmade crochet accessories crafted with love in Bangladesh.",
    siteName: "Knits by Muna",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "Knits by Muna Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Knits by Muna – Handmade Crochet Accessories",
    description:
      "Premium handmade crochet accessories crafted with love in Bangladesh.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${outfit.variable} ${playball.variable} ${cormorant.variable}`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen bg-background font-sans antialiased text-foreground"
        suppressHydrationWarning
      >
        <CartProvider>
          <WishlistProvider>
            {children}
            <Toaster
              theme="dark"
              position="top-right"
              toastOptions={{
                style: {
                  background: "oklch(0.12 0.015 270 / 0.9)",
                  color: "oklch(0.97 0 0)",
                  border: "1px solid oklch(0.72 0.25 320 / 0.4)",
                  backdropFilter: "blur(16px)",
                },
              }}
            />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
