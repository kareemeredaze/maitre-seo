import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connexion — Espace Client",
  description: "Connectez-vous à votre espace client Maitre SEO pour suivre vos campagnes de netlinking.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
