import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact — Discutons de votre stratégie netlinking",
  description:
    "Contactez notre équipe pour discuter de votre stratégie de netlinking. Réponse sous 24h. Campagnes sur mesure pour agences et consultants SEO.",
  keywords: [
    "contact netlinking",
    "agence link building",
    "devis backlinks",
    "campagne SEO contact",
  ],
  alternates: {
    canonical: "https://maitre-seo.fr/contact",
  },
  openGraph: {
    title: "Contactez Maitre SEO — Réponse sous 24h",
    description:
      "Une question sur nos offres ? Besoin d'une campagne sur mesure ? Notre équipe vous répond sous 24h.",
    url: "https://maitre-seo.fr/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-24 px-6">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-16">
          {/* Left — Info */}
          <div>
            <div className="inline-block border border-accent-cyan/30 text-accent-cyan text-sm py-1 px-4 rounded-lg mb-5">
              Contact
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-6">
              Contactez-nous
            </h1>
            <p className="text-text-secondary leading-relaxed mb-10">
              Une question sur nos offres ? Besoin d&apos;une campagne sur
              mesure ? Notre équipe vous répond sous 24h.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-brand/10 border border-accent-cyan/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">Email</p>
                  <p className="text-sm text-text-secondary">
                    contact@maitre-seo.fr
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-brand/10 border border-accent-cyan/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    Téléphone
                  </p>
                  <p className="text-sm text-text-secondary">
                    +33 1 23 45 67 89
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-brand/10 border border-accent-cyan/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    Adresse
                  </p>
                  <p className="text-sm text-text-secondary">
                    Paris, France
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="bg-bg-card border border-border-subtle rounded-2xl p-6 sm:p-8">
            <form className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm text-text-secondary mb-1.5"
                  >
                    Prénom
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    className="w-full bg-bg-base border border-accent-cyan/20 rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder-text-tertiary focus:border-accent-cyan/50 focus:outline-none transition-colors"
                    placeholder="Jean"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm text-text-secondary mb-1.5"
                  >
                    Nom
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    className="w-full bg-bg-base border border-accent-cyan/20 rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder-text-tertiary focus:border-accent-cyan/50 focus:outline-none transition-colors"
                    placeholder="Dupont"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm text-text-secondary mb-1.5"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full bg-bg-base border border-accent-cyan/20 rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder-text-tertiary focus:border-accent-cyan/50 focus:outline-none transition-colors"
                  placeholder="jean@exemple.fr"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm text-text-secondary mb-1.5"
                >
                  Sujet
                </label>
                <input
                  id="subject"
                  type="text"
                  className="w-full bg-bg-base border border-accent-cyan/20 rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder-text-tertiary focus:border-accent-cyan/50 focus:outline-none transition-colors"
                  placeholder="Campagne de netlinking"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm text-text-secondary mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full bg-bg-base border border-accent-cyan/20 rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder-text-tertiary focus:border-accent-cyan/50 focus:outline-none transition-colors resize-none"
                  placeholder="Décrivez votre projet..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand text-bg-base font-semibold py-3 rounded-lg hover:bg-brand-hover transition-colors text-sm"
              >
                Envoyer
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
