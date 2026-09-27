import type { Metadata } from "next";
import "./globals.css";
import { Navbar1 } from "@/components/navbar1";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/footer";
import { Analytics } from "@vercel/analytics/next";

/* Archivo carries a width axis: headings run in its wide cut, like the
   engraved model plate on a match rifle; body copy stays at normal width. */
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Chauhan Sports — Match air pistols, rifles and pellets",
    template: "%s · Chauhan Sports",
  },
  description:
    "Competition air pistols, air rifles, pellets and accessories for ISSF 10m shooting, from Chauhan Sports in Patna.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${archivo.variable} ${plexMono.variable} bg-void text-ink antialiased`}
      >
        <Analytics />
        <Navbar1 />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
