import type { Metadata } from "next";
import { Hind_Siliguri, DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const hindSiliguri = Hind_Siliguri({
  subsets: ["latin", "bengali"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RannaBot | AI Bangladeshi Kitchen Companion",
  description:
    "Your Smart Bangladeshi Kitchen Companion. Generate authentic Bangladeshi recipes with AI.",
  keywords: ["Bangladeshi recipes", "AI chef", "recipe generator", "Bengali food"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${hindSiliguri.variable} ${dmSans.variable} ${playfairDisplay.variable} h-full`}>
      <body
        style={{ backgroundColor: "#000000", color: "#f5efe8", minHeight: "100vh" }}
      >
        {children}
      </body>
    </html>
  );
}
