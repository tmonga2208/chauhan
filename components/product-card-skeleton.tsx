/* Matches the catalogue card exactly — same plate, same hairlines, same
   rhythm — so the grid doesn't shift when the real data lands. */
export default function ProductCardSkeleton() {
  return (
    <div className="flex h-full animate-pulse flex-col border border-hair bg-raised">
      <div className="aspect-[4/3] bg-paper/90" />
      <div className="flex items-center justify-between gap-3 border-t border-hair px-5 pt-4">
        <div className="h-2.5 w-20 bg-overlay" />
        <div className="h-2.5 w-12 bg-overlay" />
      </div>
      <div className="mt-4 px-5">
        <div className="h-5 w-3/4 bg-overlay" />
      </div>
      <div className="mt-auto flex items-end justify-between px-5 pb-5 pt-6">
        <div className="space-y-2">
          <div className="h-2 w-10 bg-overlay" />
          <div className="h-5 w-24 bg-overlay" />
        </div>
        <div className="h-2.5 w-12 bg-overlay" />
      </div>
    </div>
  );
}
