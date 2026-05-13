import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, Package2, Plus, ExternalLink, Settings } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 glass border-b border-primary/20">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative h-9 w-9 rounded-full overflow-hidden border border-primary/40">
              <Image src="/logo.png" alt="Knits by Muna" fill className="object-cover" />
            </div>
            <div>
              <p className="font-heading font-bold text-sm gradient-text-pink">
                Knits by Muna
              </p>
              <p className="text-xs text-muted-foreground">Admin Panel</p>
            </div>
          </div>
          <nav className="hidden sm:flex items-center gap-1">
            <Link
              href="/admin"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/admin/new"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
            >
              <Plus className="h-4 w-4" />
              Add Product
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs text-muted-foreground hover:text-primary hover:border-primary/40 transition-all"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              View Site
            </Link>
          </div>
        </div>
      </header>

      {/* Admin Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
