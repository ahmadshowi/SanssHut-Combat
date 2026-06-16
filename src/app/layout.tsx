import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "SanssHut Combat | The Ultimate Combat Sports Hub",
  description:
    "Explore fighters, matchups, venues, and upcoming combat sport events from around the world. MMA, Boxing, Muay Thai, Kickboxing, BJJ, and Wrestling all in one premium hub.",
  keywords: [
    "MMA",
    "UFC",
    "Boxing",
    "Muay Thai",
    "Combat Sports",
    "Fighters",
    "ONE Championship",
  ],
  openGraph: {
    title: "SanssHut Combat | The Ultimate Combat Sports Hub",
    description:
      "Explore fighters, matchups, venues, and upcoming combat sport events from around the world.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background font-body antialiased overflow-x-hidden">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
