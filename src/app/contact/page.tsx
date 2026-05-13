"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MessageCircle, Instagram, Mail, MapPin, Send, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate a messenger message for the inquiry
    const msg = `Hi Knits by Muna!\n\nMy name is ${form.name}.\nEmail: ${form.email}\n\n${form.message}`;
    const encoded = encodeURIComponent(msg);
    window.open(`https://m.me/knitsbymuna?text=${encoded}`, "_blank");
    setSubmitted(true);
    toast.success("Opening Messenger with your message!");
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="relative py-20 overflow-hidden border-b border-border/50">
          <div className="absolute inset-0 animated-gradient opacity-40" />
          <div className="relative container mx-auto px-4 text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold gradient-text-pink mb-3">
              Get in Touch
            </h1>
            <p className="text-muted-foreground text-lg">
              We'd love to hear from you! 💕
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Contact Info */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                  Reach Out to Us
                </h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Have a question about a product? Want to place a custom order?
                  Or just want to say hi? We're always happy to chat! The fastest
                  way to reach us is through Facebook Messenger or Instagram DM.
                </p>

                <div className="space-y-4">
                  {[
                    {
                      icon: MessageCircle,
                      label: "Facebook Messenger",
                      value: "m.me/knitsbymuna",
                      href: "https://m.me/knitsbymuna",
                      color: "text-primary",
                      bg: "bg-primary/10 border-primary/30",
                    },
                    {
                      icon: Instagram,
                      label: "Instagram DM",
                      value: "@knitsbymuna",
                      href: "https://ig.me/m/knitsbymuna",
                      color: "text-secondary",
                      bg: "bg-secondary/10 border-secondary/30",
                    },
                    {
                      icon: Mail,
                      label: "Email",
                      value: "knitsbymuna@gmail.com",
                      href: "mailto:knitsbymuna@gmail.com",
                      color: "text-accent",
                      bg: "bg-accent/10 border-accent/30",
                    },
                    {
                      icon: MapPin,
                      label: "Location",
                      value: "Bangladesh",
                      href: null,
                      color: "text-muted-foreground",
                      bg: "bg-muted/10 border-border",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className={`flex items-center gap-4 p-4 rounded-xl border ${item.bg} transition-all`}
                    >
                      <div className={`p-2 rounded-lg ${item.bg}`}>
                        <item.icon className={`h-5 w-5 ${item.color}`} />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground font-medium">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-sm font-semibold ${item.color} hover:underline`}
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className={`text-sm font-semibold ${item.color}`}>
                            {item.value}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <div className="glass-card rounded-2xl p-6 border border-primary/20">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
                      <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        We've opened Messenger with your message. We'll reply as
                        soon as possible! 🌸
                      </p>
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setForm({ name: "", email: "", message: "" });
                        }}
                        className="mt-6 text-primary text-sm hover:underline"
                      >
                        Send another message
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                        Send a Message
                      </h3>
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-sm font-medium text-muted-foreground mb-1.5"
                        >
                          Your Name
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, name: e.target.value }))
                          }
                          placeholder="Your full name"
                          className="w-full h-11 px-4 rounded-xl border border-border bg-background focus:outline-none focus:border-primary transition-colors text-sm"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-sm font-medium text-muted-foreground mb-1.5"
                        >
                          Email
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, email: e.target.value }))
                          }
                          placeholder="your@email.com"
                          className="w-full h-11 px-4 rounded-xl border border-border bg-background focus:outline-none focus:border-primary transition-colors text-sm"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="contact-message"
                          className="block text-sm font-medium text-muted-foreground mb-1.5"
                        >
                          Message
                        </label>
                        <textarea
                          id="contact-message"
                          required
                          rows={5}
                          value={form.message}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, message: e.target.value }))
                          }
                          placeholder="Tell us what you're looking for, or ask us anything!"
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-primary transition-colors text-sm resize-none"
                        />
                      </div>
                      <button
                        type="submit"
                        id="contact-submit-btn"
                        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 hover:shadow-[0_0_20px_oklch(0.72_0.25_320/0.4)] transition-all"
                      >
                        <Send className="h-4 w-4" />
                        Send via Messenger
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
