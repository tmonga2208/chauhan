import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Reticle } from "@/components/instrument";

/* Only real destinations — the previous footer shipped four links with an
   empty href and one to a page that doesn't exist. */
const SHOP = [
  { label: "Air pistols", href: "/categories/airpistol" },
  { label: "Air rifles", href: "/categories/airrifle" },
  { label: "Pellets", href: "/categories/pellets" },
  { label: "Accessories", href: "/categories/accessories" },
  { label: "All products", href: "/explore" },
];

const LEGAL = [
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Terms & conditions", href: "/terms-conditions" },
  { label: "Return policy", href: "/return-policy" },
  { label: "Cookie preferences", href: "/cookie-preferences" },
  { label: "Do not sell my information", href: "/do-not-sell" },
];

function Column({
  heading,
  links,
}: {
  heading: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="data text-ink-dim">{heading}</h3>
      <ul className="mt-6 space-y-3">
        {links.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              className="group inline-flex items-center gap-2 text-sm text-ink-muted transition-colors duration-300 hover:text-ink"
            >
              <span className="h-px w-0 bg-signal transition-all duration-300 group-hover:w-3" />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-hair bg-sunk">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Image
              src="/new.svg"
              width={200}
              height={143}
              alt="Chauhan Sports"
              className="h-14 w-auto object-contain"
            />
            <p className="prose-body mt-5 max-w-xs text-sm text-ink-muted text-pretty">
              Competition air pistols, rifles and pellets for 10m shooting,
              sent from Patna.
            </p>
            <a
              href="https://www.instagram.com/chauhansports/"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex h-10 items-center gap-3 border border-hair px-4 text-ink-muted transition-colors duration-300 hover:border-signal hover:text-signal"
            >
              <Instagram className="h-4 w-4" aria-hidden="true" />
              <span className="data">Instagram</span>
            </a>
          </div>

          <div className="lg:col-span-2 lg:col-start-6">
            <Column heading="Shop" links={SHOP} />
          </div>

          <div className="lg:col-span-3">
            <Column heading="Legal" links={LEGAL} />
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="data text-ink-dim">Contact</h3>
            <ul className="mt-6 space-y-5 text-sm">
              <li>
                <a
                  href="tel:+919661470953"
                  className="flex items-start gap-3 text-ink-muted transition-colors duration-300 hover:text-ink"
                >
                  <Phone
                    className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint"
                    aria-hidden="true"
                  />
                  <span className="font-data tabular-nums">
                    +91 96614 70953
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@chauhansports.com"
                  className="flex items-start gap-3 text-ink-muted transition-colors duration-300 hover:text-ink"
                >
                  <Mail
                    className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint"
                    aria-hidden="true"
                  />
                  contact@chauhansports.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-ink-muted">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint"
                  aria-hidden="true"
                />
                <address className="not-italic leading-relaxed">
                  C/O Madhusudan Singh, Chakbairiya
                  <br />
                  P.O. Bairia, P.S. Gopalpur Sampatchak
                  <br />
                  Patna, Bihar 800007
                </address>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom rule */}
        <div className="mt-16 flex flex-col items-center gap-4 border-t border-hair pt-8 sm:flex-row sm:justify-between">
          <p className="data-sm text-ink-faint">
            © {new Date().getFullYear()} Chauhan Sports Pvt Ltd
          </p>
          <Reticle className="h-5 w-5 text-ink-faint" rings={3} />
          <p className="data-sm text-ink-faint">Patna, Bihar · India</p>
        </div>
      </div>
    </footer>
  );
}
