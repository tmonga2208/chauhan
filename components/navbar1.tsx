"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { SearchPalette, useSearchHotkey } from "@/components/search-palette";
import { cn } from "@/lib/utils";

/* ==========================================================================
   Navigation.
   Four categories don't need a dropdown, so the menu is flat — one click to
   any department. The bar condenses on scroll and the hairline underneath
   is the same rule used everywhere else on the site.
   ========================================================================== */

const MENU = [
  { title: "Air pistols", url: "/categories/airpistol" },
  { title: "Air rifles", url: "/categories/airrifle" },
  { title: "Pellets", url: "/categories/pellets" },
  { title: "Accessories", url: "/categories/accessories" },
  { title: "All products", url: "/explore" },
];

const Navbar1 = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const pathname = usePathname();

  useSearchHotkey(React.useCallback(() => setSearchOpen(true), []));

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile sheet whenever navigation happens.
  React.useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-colors duration-500",
          scrolled
            ? "border-hair bg-void/85 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 transition-[height] duration-500 lg:px-10",
            scrolled ? "h-16" : "h-20"
          )}
        >
          <Link
            href="/"
            aria-label="Chauhan Sports — home"
            className="shrink-0"
          >
            <Image
              src="/new.svg"
              alt="Chauhan Sports"
              width={168}
              height={120}
              priority
              className={cn(
                "w-auto object-contain transition-[height] duration-500",
                scrolled ? "h-9" : "h-12"
              )}
            />
          </Link>

          {/* Desktop menu */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {MENU.map((item) => {
                const active = pathname === item.url;
                return (
                  <li key={item.url}>
                    <Link
                      href={item.url}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "data relative inline-flex h-10 items-center px-4 transition-colors duration-300",
                        active
                          ? "text-signal"
                          : "text-ink-muted hover:text-ink"
                      )}
                    >
                      {item.title}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-x-4 bottom-1 h-px origin-left bg-signal transition-transform duration-500",
                          active ? "scale-x-100" : "scale-x-0"
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {/* Desktop search trigger */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="data hidden h-10 items-center gap-3 border border-hair px-4 text-ink-dim transition-colors duration-300 hover:border-hair-strong hover:text-ink lg:flex"
            >
              <Search className="h-3.5 w-3.5" aria-hidden="true" />
              Search
              <kbd className="ml-2 border border-hair px-1.5 py-0.5 text-[0.625rem] text-ink-faint">
                ⌘K
              </kbd>
            </button>

            {/* Mobile search */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search products"
              className="grid h-10 w-10 place-items-center border border-hair text-ink-muted transition-colors hover:text-ink lg:hidden"
            >
              <Search className="h-4 w-4" />
            </button>

            {/* Mobile menu */}
            <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
              <Dialog.Trigger
                aria-label="Open menu"
                className="grid h-10 w-10 place-items-center border border-hair text-ink-muted transition-colors hover:text-ink lg:hidden"
              >
                <Menu className="h-4 w-4" />
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-[100] bg-sunk/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
                <Dialog.Content className="fixed inset-y-0 right-0 z-[101] flex w-[86vw] max-w-sm flex-col border-l border-hair bg-void data-[state=open]:animate-in data-[state=open]:slide-in-from-right data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right">
                  <Dialog.Title className="sr-only">Menu</Dialog.Title>
                  <div className="flex items-center justify-between border-b border-hair px-6 py-5">
                    <span className="data text-ink-dim">Menu</span>
                    <Dialog.Close
                      aria-label="Close menu"
                      className="grid h-9 w-9 place-items-center border border-hair text-ink-muted transition-colors hover:text-ink"
                    >
                      <X className="h-4 w-4" />
                    </Dialog.Close>
                  </div>

                  <nav className="flex-1 overflow-y-auto px-6 py-4">
                    <ul>
                      {MENU.map((item) => (
                        <li key={item.url}>
                          <Link
                            href={item.url}
                            className="display flex items-center justify-between border-b border-hair py-5 text-2xl text-ink transition-colors hover:text-signal"
                          >
                            {item.title}
                            <span
                              aria-hidden="true"
                              className="text-ink-faint"
                            >
                              →
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>

                  <div className="border-t border-hair px-6 py-6">
                    <p className="data-sm text-ink-faint">Talk to us</p>
                    <a
                      href="tel:+919661470953"
                      className="font-data mt-2 block text-lg text-ink transition-colors hover:text-signal"
                    >
                      +91 96614 70953
                    </a>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </div>
      </header>

      <SearchPalette open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
};

export { Navbar1 };
