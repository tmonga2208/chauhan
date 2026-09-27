/* Mirrors the product page layout so nothing jumps when the data lands. */
export default function ProductPageSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] gap-10 px-6 py-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16 lg:px-10 lg:py-16">
        {/* Gallery */}
        <div>
          <div className="aspect-[4/3] border border-hair bg-paper/90" />
          <div className="mt-3 flex gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-20 w-24 border border-hair bg-paper/90" />
            ))}
          </div>
        </div>

        {/* Buy rail */}
        <div>
          <div className="h-2.5 w-24 bg-overlay" />
          <div className="mt-6 h-10 w-3/4 bg-overlay" />
          <div className="mt-5 flex gap-2">
            <div className="h-8 w-24 bg-overlay" />
            <div className="h-8 w-20 bg-overlay" />
          </div>
          <div className="mt-8 border-t border-hair pt-6">
            <div className="h-2 w-10 bg-overlay" />
            <div className="mt-3 h-9 w-48 bg-overlay" />
          </div>
          <div className="mt-6 h-14 w-full bg-overlay" />
          <div className="mt-10 space-y-3 border-t border-hair pt-6">
            <div className="h-3 w-full bg-overlay" />
            <div className="h-3 w-5/6 bg-overlay" />
            <div className="h-3 w-4/6 bg-overlay" />
          </div>
        </div>
      </div>

      {/* Specification */}
      <div className="border-y border-hair bg-sunk py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="h-8 w-56 bg-overlay" />
          <div className="mt-8 grid gap-x-16 md:grid-cols-2">
            {Array.from({ length: 2 }).map((_, col) => (
              <div key={col}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 border-b border-hair py-4"
                  >
                    <div className="h-2.5 w-28 bg-overlay" />
                    <div className="h-px flex-1 bg-hair-faint" />
                    <div className="h-2.5 w-16 bg-overlay" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
