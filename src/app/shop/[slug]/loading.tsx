export default function Loading() {
  return (
    <main className="container mx-auto px-4 py-12 animate-pulse">
      <nav className="flex items-center gap-2 text-sm mb-8">
        <div className="h-4 w-12 rounded bg-border/60" />
        <span className="text-muted-foreground">/</span>
        <div className="h-4 w-10 rounded bg-border/60" />
        <span className="text-muted-foreground">/</span>
        <div className="h-4 w-40 rounded bg-border/60" />
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="aspect-square rounded-2xl bg-border/50 border border-border/50" />
          <div className="flex gap-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-20 w-20 rounded-xl bg-border/50" />
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="h-6 w-20 rounded-full bg-border/60" />
            <div className="h-6 w-14 rounded-full bg-border/60" />
          </div>

          <div className="h-10 w-4/5 rounded bg-border/60 mb-3" />
          <div className="h-5 w-48 rounded bg-border/50 mb-5" />
          <div className="h-12 w-36 rounded bg-border/60 mb-6" />

          <div className="space-y-3 mb-6">
            <div className="h-4 w-full rounded bg-border/50" />
            <div className="h-4 w-11/12 rounded bg-border/50" />
            <div className="h-4 w-10/12 rounded bg-border/50" />
          </div>

          <div className="mb-6">
            <div className="h-4 w-24 rounded bg-border/50 mb-3" />
            <div className="flex gap-2">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="h-10 w-24 rounded-xl bg-border/50" />
              ))}
            </div>
          </div>

          <div className="mb-6">
            <div className="h-4 w-20 rounded bg-border/50 mb-3" />
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-border/50" />
              <div className="h-6 w-8 rounded bg-border/50" />
              <div className="h-10 w-10 rounded-xl bg-border/50" />
            </div>
          </div>

          <div className="h-5 w-44 rounded bg-border/50 mb-6" />

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="h-12 flex-1 rounded-2xl bg-border/60" />
            <div className="h-12 w-full sm:w-14 rounded-2xl bg-border/60" />
            <div className="h-12 w-full sm:w-14 rounded-2xl bg-border/60" />
          </div>

          <div className="h-12 w-full rounded-2xl bg-border/60 mb-6" />

          <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-border/50">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <div className="h-10 w-10 rounded-xl bg-border/50" />
                <div className="h-3 w-20 rounded bg-border/50" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-24">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-1 w-12 rounded-full bg-border/60" />
          <div className="h-6 w-40 rounded bg-border/60" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="rounded-2xl border border-border/50 p-4">
              <div className="aspect-square rounded-xl bg-border/50 mb-4" />
              <div className="h-4 w-3/4 rounded bg-border/50 mb-2" />
              <div className="h-3 w-full rounded bg-border/40 mb-2" />
              <div className="h-3 w-2/3 rounded bg-border/40" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
