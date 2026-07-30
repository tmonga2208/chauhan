import type { Metadata } from "next";
import "./globals.css";
import { Navbar1 } from "@/components/navbar1";
import { Geist, Geist_Mono, Crimson_Pro } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/footer";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const crimson = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-crimson",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Chauhan Sports — Match air pistols, rifles and pellets",
    template: "%s · Chauhan Sports",
  },
  description:
    "Competition air pistols, air rifles, pellets and accessories for ISSF 10m shooting. Every instrument inspected and certified before it ships.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${crimson.variable} bg-void text-ink antialiased`}
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
