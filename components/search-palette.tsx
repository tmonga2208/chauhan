"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Reticle } from "@/components/instrument";
import { cn } from "@/lib/utils";
import type { ProductProps } from "@/types/product";
import { displayTitle, formatINR } from "@/lib/catalogue";

/* ==========================================================================
   Search, as a command palette.
   Opens on ⌘K, matches while you type, and is fully keyboard-driven —
   arrow keys move the selection, Enter opens it, Escape closes.
   ========================================================================== */

export function SearchPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<ProductProps[]>([]);
  const [cursor, setCursor] = React.useState(0);
  const [busy, setBusy] = React.useState(false);
  const router = useRouter();

  // Reset each time the palette is opened.
  React.useEffect(() => {
    if (open) {
      setQuery("");
      setResults([]);
      setCursor(0);
    }
  }, [open]);

  React.useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setBusy(false);
      return;
    }
    setBusy(true);
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(Array.isArray(data) ? data : []);
        setCursor(0);
      } catch {
        setResults([]);
      } finally {
        setBusy(false);
      }
    }, 250);
    return () => clearTimeout(t);
  }, [query]);

  const go = React.useCallback(
    (href: string) => {
      onOpenChange(false);
      router.push(href);
    },
    [onOpenChange, router]
  );

  const showAll = query.trim().length >= 2;
  const rowCount = results.length + (showAll ? 1 : 0);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => (rowCount ? (c + 1) % rowCount : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => (rowCount ? (c - 1 + rowCount) % rowCount : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (cursor < results.length) {
        go(`/products/${results[cursor].id}`);
      } else if (showAll) {
        go(`/search?q=${encodeURIComponent(query)}`);
      }
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-sunk/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <Dialog.Content
          onKeyDown={onKeyDown}
          className="fixed left-1/2 top-[12vh] z-[101] w-[calc(100vw-2rem)] max-w-xl -translate-x-1/2 border border-hair-strong bg-overlay shadow-2xl shadow-black/60 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
        >
          <Dialog.Title className="sr-only">Search products</Dialog.Title>
          <Dialog.Description className="sr-only">
            Type at least two characters to search the catalogue.
          </Dialog.Description>

          {/* Input row */}
          <div className="flex items-center gap-3 border-b border-hair px-5">
            <Search
              className="h-4 w-4 shrink-0 text-ink-dim"
              aria-hidden="true"
            />
            {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search pistols, rifles, pellets…"
              aria-label="Search products"
              className="h-14 w-full bg-transparent text-base text-ink outline-none placeholder:text-ink-faint"
            />
            <kbd className="data-sm hidden shrink-0 border border-hair px-2 py-1 text-ink-faint sm:block">
              Esc
            </kbd>
          </div>

          {/* Results */}
          <div className="max-h-[52vh] overflow-y-auto">
            {query.trim().length < 2 ? (
              <div className="flex flex-col items-center gap-3 px-6 py-12 text-center">
                <Reticle className="h-10 w-10 text-ink-faint" rings={3} />
                <p className="data-sm text-ink-faint">
                  Type at least two characters
                </p>
              </div>
            ) : busy && results.length === 0 ? (
              <div className="grid place-items-center py-12">
                <Reticle
                  className="h-8 w-8 animate-ring-pulse text-ink-faint"
                  rings={3}
                />
              </div>
            ) : results.length === 0 ? (
              <div className="flex flex-col items-center gap-2 px-6 py-12 text-center">
                <p className="text-sm text-ink-muted">
                  No products match “{query}”.
                </p>
                <p className="data-sm text-ink-faint">
                  Try a brand, a model, or “pellets”
                </p>
              </div>
            ) : (
              <ul>
                {results.map((p, i) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      onMouseEnter={() => setCursor(i)}
                      onClick={() => go(`/products/${p.id}`)}
                      className={cn(
                        "flex w-full items-center gap-4 border-b border-hair px-5 py-3 text-left transition-colors",
                        cursor === i ? "bg-raised" : "hover:bg-raised/60"
                      )}
                    >
                      <span className="photo-plate relative h-11 w-11 shrink-0 overflow-hidden">
                        {p.img?.[0] && (
                          <Image
                            src={p.img[0]}
                            alt=""
                            fill
                            sizes="44px"
                            className="object-contain p-0.5"
                          />
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm text-ink">
                          {displayTitle(p.title)}
                        </span>
                        <span className="data-sm mt-0.5 block text-ink-faint">
                          {p.categories?.[0] ?? "Catalogue"}
                        </span>
                      </span>
                      <span className="font-data shrink-0 text-sm tabular-nums text-signal">
                        {p.price
                          ? `₹${formatINR(p.price)}`
                          : "On request"}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {showAll && results.length > 0 && (
              <button
                type="button"
                onMouseEnter={() => setCursor(results.length)}
                onClick={() => go(`/search?q=${encodeURIComponent(query)}`)}
                className={cn(
                  "data flex w-full items-center justify-between px-5 py-4 text-left transition-colors",
                  cursor === results.length
                    ? "bg-raised text-signal"
                    : "text-ink-dim hover:bg-raised/60"
                )}
              >
                See all results for “{query}”
                <span aria-hidden="true">→</span>
              </button>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/** ⌘K / Ctrl+K anywhere on the site. */
export function useSearchHotkey(onOpen: () => void) {
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpen();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onOpen]);
}
