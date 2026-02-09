import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import BackToTop from "@/components/BackToTop";
import "./globals.css";

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const BASE_URL = "https://maitre-seo.fr";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Maitre SEO — Partenaire Netlinking pour Agences et Experts SEO",
    template: "%s | Maitre SEO",
  },
  description:
    "Infrastructure netlinking en marque blanche pour agences et consultants SEO. Guest posts, insertions de liens et forfaits agences scalables. Trafic organique réel, zéro PBN.",
  keywords: [
    "netlinking",
    "backlinks",
    "guest post",
    "niche edit",
    "link building",
    "SEO",
    "marque blanche",
    "agence SEO",
    "consultant SEO",
    "DR",
    "domain rating",
  ],
  authors: [{ name: "Maitre SEO" }],
  creator: "Maitre SEO",
  openGraph: {
    title: "Maitre SEO — Partenaire Netlinking pour Agences et Experts SEO",
    description:
      "Le netlinking conçu par des experts SEO, pour des experts SEO. Infrastructure en marque blanche et rapports prêts à transmettre.",
    type: "website",
    locale: "fr_FR",
    url: BASE_URL,
    siteName: "Maitre SEO",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maitre SEO — Partenaire Netlinking pour Agences et Experts SEO",
    description:
      "Infrastructure netlinking en marque blanche pour agences et consultants SEO.",
  },
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${spaceMono.variable} antialiased`}>
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
