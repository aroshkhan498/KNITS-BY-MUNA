import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Terms & Conditions – Knits by Muna",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="relative py-12 mb-12 text-center">
            <div className="absolute inset-0 animated-gradient opacity-30 rounded-2xl" />
            <h1 className="relative font-heading text-4xl font-bold gradient-text-blue">
              Terms & Conditions
            </h1>
            <p className="relative text-muted-foreground mt-2 text-sm">
              Last updated: May 2026
            </p>
          </div>

          <div className="glass-card rounded-2xl p-8 border border-border/50 space-y-8">
            {[
              {
                title: "1. Products & Handmade Nature",
                content:
                  "All products sold by Knits by Muna are handmade. Due to the handmade nature of each item, minor variations in color, size, and pattern are normal and expected. These variations make each piece unique and are not considered defects.",
              },
              {
                title: "2. Ordering Process",
                content:
                  "Orders are placed through Facebook Messenger or Instagram DM. An order is confirmed only after you receive an explicit confirmation message from us. We reserve the right to decline any order at our discretion.",
              },
              {
                title: "3. Pricing",
                content:
                  "All prices are listed in Bangladeshi Taka (৳). Prices may change without notice. The price shown at the time of order confirmation is the final price you will pay.",
              },
              {
                title: "4. Payment",
                content:
                  "We accept bKash, Nagad, and bank transfers. Payment details are provided after order confirmation. Full payment must be received before shipping, unless otherwise agreed.",
              },
              {
                title: "5. Shipping & Delivery",
                content:
                  "We currently ship within Bangladesh only. Delivery typically takes 3-7 business days depending on your location. We are not responsible for delays caused by courier services.",
              },
              {
                title: "6. Returns & Exchanges",
                content:
                  "Due to the handmade nature of our products, we do not accept returns or exchanges unless an item is damaged upon arrival. Please report damage within 48 hours of receiving your order with photographic evidence.",
              },
              {
                title: "7. Custom Orders",
                content:
                  "Custom orders are non-refundable once production has begun. Please ensure all details are correct before confirming a custom order. We will provide a preview/description before starting.",
              },
              {
                title: "8. Intellectual Property",
                content:
                  "All designs, photos, and content on this website and our social media pages are the intellectual property of Knits by Muna. Reproduction without permission is prohibited.",
              },
              {
                title: "9. Contact",
                content:
                  "For questions about these terms, contact us at knitsbymuna@gmail.com or via Facebook Messenger.",
              },
            ].map((section) => (
              <section key={section.title}>
                <h2 className="font-heading text-lg font-bold text-secondary mb-3">
                  {section.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {section.content}
                </p>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
