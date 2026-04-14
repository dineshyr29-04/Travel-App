import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SkyBound | Premium Travel Experiences",
  description: "Discover the world with SkyBound. Your gateway to luxury and adventure travel.",
  keywords: ["travel", "luxury travel", "booking", "adventure", "destinations"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} antialiased font-body`}>
        {children}
      </body>
    </html>
  );
}
