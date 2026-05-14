import Link from "next/link";
import { Cart } from "./cart";
import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-primary/50 group-hover:border-primary transition-colors shadow-[0_0_15px_rgba(var(--primary),0.3)] group-hover:shadow-[0_0_25px_rgba(var(--primary),0.6)]">
            <Image src="/logo.png" alt="Knits by Muna Logo" fill className="object-cover" />
          </div>
          <span className="font-playball text-3xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-[0_0_8px_rgba(var(--primary),0.5)]">
            KNITS BY MUNA
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Cart />
        </div>
      </div>
    </header>
  );
}
