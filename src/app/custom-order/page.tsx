"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Sparkles, CheckCircle, MessageCircle, Palette, Ruler, Heart } from "lucide-react";
import { toast } from "sonner";

const PRODUCT_TYPES = [
  "Flower Keychain",
  "Bag Charm",
  "Phone Charm",
  "Mini Bouquet",
  "Sunflower Charm",
  "Tulip Arrangement",
  "Other (describe below)",
];

const COLOR_OPTIONS = [
  "Pink", "Purple", "Blue", "Lavender", "White", "Red", "Orange",
  "Yellow", "Green", "Mixed/Rainbow", "Pastel Mix", "Dark/Moody",
];

export default function CustomOrderPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    productType: "",
    colors: [] as string[],
    quantity: "1",
    budget: "",
    occasion: "",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const toggleColor = (color: string) => {
    setForm((f) => ({
      ...f,
      colors: f.colors.includes(color)
        ? f.colors.filter((c) => c !== color)
        : [...f.colors, color],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const msg = `🌸 Custom Order Request – Knits by Muna 🌸

👤 Name: ${form.name}
📞 Phone: ${form.phone}

🛍️ Product Type: ${form.productType}
🎨 Colors: ${form.colors.join(", ") || "Open to suggestions"}
📦 Quantity: ${form.quantity}
💰 Budget: ${form.budget || "Flexible"}
🎉 Occasion: ${form.occasion || "Not specified"}

📝 Details:
${form.description}

Thank you! 🌺`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://m.me/knitsbymuna?text=${encoded}`, "_blank");
    setSubmitted(true);
    toast.success("Custom order request sent via Messenger!");
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="relative py-20 overflow-hidden border-b border-border/50">
          <div className="absolute inset-0 animated-gradient opacity-50" />
          <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-primary/10 blur-[80px]" />
          <div className="relative container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              Made Just For You
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold gradient-text-pink mb-4">
              Custom Order Request
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Can't find exactly what you're looking for? We'll make it just for you!
              Tell us your dream piece and we'll create it.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-2xl">
            {/* Feature pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {[
                { icon: Palette, label: "Your Choice of Colors" },
                { icon: Ruler, label: "Custom Size" },
                { icon: Heart, label: "Made with Love" },
              ].map((f) => (
                <div
                  key={f.label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm"
                >
                  <f.icon className="h-4 w-4" />
                  {f.label}
                </div>
              ))}
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card rounded-2xl p-10 border border-primary/20 text-center"
              >
                <CheckCircle className="h-20 w-20 text-primary mx-auto mb-6" />
                <h2 className="font-heading text-3xl font-bold gradient-text-pink mb-3">
                  Request Sent! 🎉
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Your custom order request has been sent via Messenger. We'll
                  review it and get back to you within 24 hours with pricing,
                  timeline, and more details!
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-primary text-sm hover:underline"
                >
                  Submit another request
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="glass-card rounded-2xl p-6 md:p-8 border border-primary/20 space-y-6"
              >
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Tell Us About Your Order
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="co-name" className="block text-sm font-medium text-muted-foreground mb-1.5">
                      Your Name *
                    </label>
                    <input
                      id="co-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="Full name"
                      className="w-full h-11 px-4 rounded-xl border border-border bg-background focus:outline-none focus:border-primary transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="co-phone" className="block text-sm font-medium text-muted-foreground mb-1.5">
                      Phone / WhatsApp *
                    </label>
                    <input
                      id="co-phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      placeholder="01XXXXXXXXX"
                      className="w-full h-11 px-4 rounded-xl border border-border bg-background focus:outline-none focus:border-primary transition-colors text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="co-product" className="block text-sm font-medium text-muted-foreground mb-1.5">
                    What would you like? *
                  </label>
                  <select
                    id="co-product"
                    required
                    value={form.productType}
                    onChange={(e) => setForm((f) => ({ ...f, productType: e.target.value }))}
                    className="w-full h-11 px-4 rounded-xl border border-border bg-background focus:outline-none focus:border-primary transition-colors text-sm"
                  >
                    <option value="">Select product type</option>
                    {PRODUCT_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    Preferred Colors (select all that apply)
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {COLOR_OPTIONS.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => toggleColor(color)}
                        className={`px-3 py-1.5 text-xs rounded-lg border font-medium transition-all ${
                          form.colors.includes(color)
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border text-muted-foreground hover:border-primary/40"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="co-qty" className="block text-sm font-medium text-muted-foreground mb-1.5">
                      Quantity
                    </label>
                    <input
                      id="co-qty"
                      type="number"
                      min="1"
                      value={form.quantity}
                      onChange={(e) => setForm((f) => ({ ...f, quantity: e.target.value }))}
                      className="w-full h-11 px-4 rounded-xl border border-border bg-background focus:outline-none focus:border-primary transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="co-budget" className="block text-sm font-medium text-muted-foreground mb-1.5">
                      Budget (৳)
                    </label>
                    <input
                      id="co-budget"
                      type="text"
                      value={form.budget}
                      onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value }))}
                      placeholder="e.g. 200-500"
                      className="w-full h-11 px-4 rounded-xl border border-border bg-background focus:outline-none focus:border-primary transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="co-occasion" className="block text-sm font-medium text-muted-foreground mb-1.5">
                      Occasion
                    </label>
                    <input
                      id="co-occasion"
                      type="text"
                      value={form.occasion}
                      onChange={(e) => setForm((f) => ({ ...f, occasion: e.target.value }))}
                      placeholder="Gift, birthday, etc."
                      className="w-full h-11 px-4 rounded-xl border border-border bg-background focus:outline-none focus:border-primary transition-colors text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="co-desc" className="block text-sm font-medium text-muted-foreground mb-1.5">
                    Describe your order in detail *
                  </label>
                  <textarea
                    id="co-desc"
                    required
                    rows={4}
                    value={form.description}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    placeholder="Be as specific as possible! Include size preferences, style, any reference images you have, etc."
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-primary transition-colors text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  id="custom-order-submit-btn"
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 hover:shadow-[0_0_30px_oklch(0.72_0.25_320/0.5)] transition-all"
                >
                  <MessageCircle className="h-5 w-5" />
                  Send Custom Order Request
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
