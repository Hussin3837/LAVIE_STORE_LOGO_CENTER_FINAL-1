import "./globals.css";

import type { Metadata } from "next";

import {
  Cormorant_Garamond,
  Inter,
} from "next/font/google";

import { CartProvider } from "../components/CartContext";
import MusicPlayer from "../components/MusicPlayer";

const headingFont =
  Cormorant_Garamond({
    subsets: ["latin"],
    variable: "--font-heading",
  });

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title:
    "LA VIE — Luxury Perfume House",

  description:
    "Discover cinematic luxury fragrances crafted for unforgettable presence.",

  keywords: [
    "Luxury Perfume",
    "Perfume House",
    "Designer Fragrance",
    "LA VIE",
    "Luxury Brand",
  ],

  authors: [
    {
      name: "LA VIE",
    },
  ],

  themeColor: "#050505",

  openGraph: {
    title:
      "LA VIE — Luxury Perfume House",

    description:
      "Discover cinematic luxury fragrances crafted for unforgettable presence.",

    url: "https://lavie.com",

    siteName: "LA VIE",

    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "LA VIE",
      },
    ],

    locale: "en_US",

    type: "website",
  },

  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fontClassName =
    headingFont.variable +
    " " +
    bodyFont.variable;

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={fontClassName}
    >
      <body suppressHydrationWarning>
        <CartProvider>
          {children}

          <MusicPlayer />
        </CartProvider>

        {/* CURSOR GLOW */}
        <div
          id="cursor-glow"
          style={{
            position: "fixed",
            width: 260,
            height: 260,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(179,138,82,.18) 0%, rgba(179,138,82,0) 70%)",
            pointerEvents: "none",
            transform:
              "translate(-50%, -50%)",
            zIndex: 9999,
            mixBlendMode: "screen",
            filter: "blur(10px)",
          }}
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              const glow = document.getElementById('cursor-glow');

              window.addEventListener('mousemove', (e) => {
                glow.style.left = e.clientX + 'px';
                glow.style.top = e.clientY + 'px';
              });
            `,
          }}
        />
      </body>
    </html>
  );
}