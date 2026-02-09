import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inscription — Créer un compte",
  description: "Créez votre compte Maitre SEO pour accéder à vos campagnes de netlinking.",
  robots: { index: false, follow: false },
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
