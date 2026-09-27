import Link from "next/link";
import { Reticle } from "@/components/instrument";

export default function ProductNotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <Reticle className="h-16 w-16 text-ink-faint" />
      <h1 className="display text-display-sm text-ink">Product not found</h1>
      <p className="prose-body max-w-sm text-ink-muted">
        This listing may have sold or been removed.
      </p>
      <Link href="/explore" className="data mt-2 text-signal">
        Browse the catalogue →
      </Link>
    </div>
  );
}
