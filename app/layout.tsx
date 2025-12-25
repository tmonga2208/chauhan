import type { Metadata } from "next";
import "./globals.css";
import { Navbar1 } from "@/components/navbar1";


export const metadata: Metadata = {
  title: "Chauhan Sports",
  description: "Buy second-hand air pistols, air rifles, pellets, and accessories online at Chauhan Sports. Quality-checked airguns at the best prices for shooting enthusiasts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <Navbar1 />
          {children}
      </body>
    </html>
  );
}
