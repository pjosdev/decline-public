import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import SiteNav from "@/components/navigation/site-nav";
import Footer from "@/components/navigation/footer";
import { CartProvider } from "@/components/cart/cart-context";
import { CartSheet } from "@/components/cart/cart-sheet";
import { ViewTransitions } from "next-view-transitions";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const suisseWorks = localFont({
  src: [
    {
      path: "./fonts/SuisseWorks-Book-WebS.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/SuisseWorks-BookItalic-WebS.woff",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/SuisseWorks-Bold-WebS.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/SuisseWorks-BoldItalic-WebS.woff",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-suisse-works",
});

export const metadata: Metadata = {
  title: "decline | satorial curation for the doomed generation",
  description:
    "Discover premium fashion at ONI. Shop men's and women's collections.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${suisseWorks.variable} antialiased`}
        >
          <CartProvider>
            <SiteNav />
            <main>{children}</main>
            <Footer />
            <CartSheet />
            <Toaster />
          </CartProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
