import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/config/site";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://connoisseursestate.com"),
  title: `${SITE_CONFIG.brandTitle} — ${SITE_CONFIG.roleTitle}`,
  description: `${SITE_CONFIG.corePositioning} ${SITE_CONFIG.subtagline}`,
  keywords: [
    "Aesthetic Director",
    "Luxury Interior Curation",
    "Archival Fashion",
    "Art Sourcing",
    "Private Commissions",
    "Connoisseurship",
    "Tuscan Architecture",
  ],
  authors: [{ name: SITE_CONFIG.personalName }],
  openGraph: {
    title: `${SITE_CONFIG.brandTitle} — ${SITE_CONFIG.roleTitle}`,
    description: SITE_CONFIG.corePositioning,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/hero-estate-palazzo.jpg",
        width: 1920,
        height: 1080,
        alt: `${SITE_CONFIG.brandTitle} — Italian Palazzo Salon`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.brandTitle} — ${SITE_CONFIG.roleTitle}`,
    description: SITE_CONFIG.corePositioning,
    images: ["/images/hero-estate-palazzo.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-estate-black text-charcoal flex flex-col selection:bg-oxblood selection:text-ivory">
        {/* Skip to Content Link for Keyboard Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-parchment focus:text-walnut focus:font-sans focus:text-xs focus:tracking-widest focus:uppercase focus:shadow-lg focus:border focus:border-brass"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
