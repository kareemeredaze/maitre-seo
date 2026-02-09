import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard — Espace Client",
  description: "Gérez vos campagnes de netlinking, suivez vos backlinks et consultez vos factures.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
