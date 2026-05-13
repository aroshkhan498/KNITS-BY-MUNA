import Link from "next/link";
import Image from "next/image";
import { Heart, Mail, MapPin, ExternalLink } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/icons/social";

const footerLinks = {
  shop: [
    { href: "/shop", label: "All Products" },
    { href: "/categories", label: "Categories" },
    { href: "/shop?filter=new", label: "New Arrivals" },
    { href: "/shop?filter=sale", label: "Sale Items" },
    { href: "/custom-order", label: "Custom Order" },
  ],
  help: [
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact Us" },
    { href: "/about", label: "About Us" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms & Conditions" },
  ],
};

export function Footer() {
  return (
    <footer className="relative border-t border-border/50 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="relative container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-primary/50 group-hover:border-primary transition-all duration-300 shadow-[0_0_20px_oklch(0.72_0.25_320/0.3)]">
                <Image
                  src="/logo.png"
                  alt="Knits by Muna Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-heading font-bold text-2xl gradient-text-pink">
                Knits by Muna
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mb-6">
              Handmade crochet accessories crafted with love in Bangladesh. Each
              piece is unique, made with premium yarn and endless care. From
              keychains to bouquets — we make everyday moments beautiful. 🌸
            </p>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
              <MapPin className="h-4 w-4 text-primary shrink-0" />
              <span>Dhaka, Dhaka, Bangladesh, 1362</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
              <Mail className="h-4 w-4 text-primary shrink-0" />
              <a
                href="mailto:munaforayeji1407@gmail.com"
                className="hover:text-primary transition-colors"
              >
                munaforayeji1407@gmail.com
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/knitsbymuna"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow on Instagram"
                className="flex items-center justify-center h-10 w-10 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all duration-300 group"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61588396945080"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow on Facebook"
                className="flex items-center justify-center h-10 w-10 rounded-xl border border-border hover:border-secondary/50 hover:bg-secondary/10 text-muted-foreground hover:text-secondary transition-all duration-300"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a
                href="https://m.me/61588396945080"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message on Messenger"
                className="flex h-10 items-center gap-2 px-4 rounded-xl bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 hover:shadow-[0_0_15px_oklch(0.72_0.25_320/0.3)] transition-all duration-300 text-sm font-medium"
              >
                <ExternalLink className="h-4 w-4" />
                Order via DM
              </a>
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-widest text-primary mb-6">
              Shop
            </h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground hover:translate-x-1 inline-flex items-center transition-all duration-200 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary mr-2 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help links */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-widest text-secondary mb-6">
              Help
            </h4>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground hover:translate-x-1 inline-flex items-center transition-all duration-200 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary/40 group-hover:bg-secondary mr-2 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Knits by Muna. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Made with{" "}
            <Heart className="h-3 w-3 text-primary fill-primary animate-pulse" />{" "}
            in Bangladesh
          </p>
        </div>
      </div>
    </footer>
  );
}
