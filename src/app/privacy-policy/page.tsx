import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Privacy Policy – Knits by Muna",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="relative py-12 mb-12 text-center">
            <div className="absolute inset-0 animated-gradient opacity-30 rounded-2xl" />
            <h1 className="relative font-heading text-4xl font-bold gradient-text-pink">
              Privacy Policy
            </h1>
            <p className="relative text-muted-foreground mt-2 text-sm">
              Last updated: May 2026
            </p>
          </div>

          <div className="glass-card rounded-2xl p-8 border border-border/50 prose prose-invert max-w-none space-y-8">
            {[
              {
                title: "Information We Collect",
                content:
                  "When you place an order or contact us, we may collect your name, phone number, and order details. This information is shared through Facebook Messenger or Instagram DM for order processing purposes only.",
              },
              {
                title: "How We Use Your Information",
                content:
                  "We use your contact information solely to process your order, communicate about delivery, and provide customer support. We do not sell, trade, or share your personal information with third parties.",
              },
              {
                title: "Data Storage",
                content:
                  "We do not store payment information. Order communications happen through Facebook Messenger, which is governed by Meta's privacy policy. We may maintain order records for up to 1 year for customer support purposes.",
              },
              {
                title: "Cookies",
                content:
                  "Our website uses essential cookies for functionality (like your cart and wishlist). We do not use tracking cookies or advertising cookies.",
              },
              {
                title: "Third-Party Services",
                content:
                  "We use Facebook/Instagram for order placement and customer communication. These platforms have their own privacy policies. We recommend reviewing Meta's privacy policy for details on how they handle your data.",
              },
              {
                title: "Your Rights",
                content:
                  "You have the right to request deletion of your personal information. Contact us via Messenger to request data deletion. We will honor your request within 30 days.",
              },
              {
                title: "Contact",
                content:
                  "For privacy-related questions, contact us at knitsbymuna@gmail.com or message us on Facebook.",
              },
            ].map((section) => (
              <section key={section.title}>
                <h2 className="font-heading text-xl font-bold text-primary mb-3">
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
