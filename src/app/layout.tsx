import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "SanssHut Combat | Indonesia's Premier Combat Sports Platform",

  description:
    "Discover SanssHut Combat fighters, fight cards, matchups, event schedules, venues, rankings, and exclusive combat sports content. Featuring MMA, Boxing, Muay Thai, Kickboxing, Wrestling, and more.",

  keywords: [
    "SanssHut Combat",
    "Combat Sports Indonesia",
    "MMA Indonesia",
    "Boxing Indonesia",
    "Muay Thai Indonesia",
    "Kickboxing Indonesia",
    "Combat Event",
    "Fight Card",
    "Fighter Profiles",
    "Combat Sports",
    "Martial Arts",
    "Wrestling",
    "Combat Night",
    "Fight Prediction",
    "Combat Arena",
    "Combat League",
  ],

  openGraph: {
    title: "SanssHut Combat",
    description:
      "Indonesia's premier combat sports platform featuring fighters, fight cards, schedules, venues, and exclusive event coverage.",
    siteName: "SanssHut Combat",
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
