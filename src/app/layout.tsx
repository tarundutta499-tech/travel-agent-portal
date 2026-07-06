import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const displayFont = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wandertribe — Kashmir Adventure Travel Booking Platform",
  description: "Vibrant, adventure-first Kashmir travel experiences curated for the independent explorer.",
  openGraph: {
    title: "Wandertribe — Kashmir Adventure Travel Booking Platform",
    description: "Vibrant, adventure-first Kashmir travel experiences curated for the independent explorer.",
    url: "https://travel-agent-portal.vercel.app",
    siteName: "Wandertribe",
    images: [
      {
        url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200",
        width: 1200,
        height: 630,
        alt: "Wandertribe Kashmir Adventures",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wandertribe — Kashmir Adventure Travel Booking Platform",
    description: "Vibrant, adventure-first Kashmir travel experiences curated for the independent explorer.",
    images: ["https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${displayFont.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-sand text-obsidian selection:bg-primary/20 selection:text-primary">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
