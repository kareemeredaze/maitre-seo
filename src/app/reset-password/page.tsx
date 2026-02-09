"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  if (success) {
    return (
      <>
        <Navbar />
        <main className="pt-24 pb-24 px-6 flex items-center justify-center min-h-[80vh]">
          <div className="w-full max-w-md">
            <div className="bg-bg-card border border-border-subtle rounded-2xl p-6 sm:p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-brand/10 border border-brand/30 flex items-center justify-center mx-auto mb-4">
                <span className="text-brand text-xl">✓</span>
              </div>
              <h2 className="text-xl font-bold text-text-primary mb-2">
                Email envoyé
              </h2>
              <p className="text-sm text-text-secondary mb-6">
                Si un compte existe pour{" "}
                <span className="text-text-primary font-medium">{email}</span>,
                vous recevrez un email avec un lien de réinitialisation.
              </p>
              <a
                href="/login"
                className="inline-block bg-brand text-bg-base font-semibold py-2.5 px-6 rounded-lg hover:bg-brand-hover transition-colors text-sm"
              >
                Retour à la connexion
              </a>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-24 px-6 flex items-center justify-center min-h-[80vh]">
        <div className="w-full max-w-md">
          <div className="bg-bg-card border border-border-subtle rounded-2xl p-6 sm:p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-text-primary">
                Maitre<span className="text-brand">SEO</span>
              </h1>
              <p className="text-sm text-text-tertiary mt-2">
                Réinitialiser le mot de passe
              </p>
            </div>

            {error && (
              <div className="mb-5 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleReset} className="space-y-5">
              <div>
                <label
                  htmlFor="reset-email"
                  className="block text-sm text-text-secondary mb-1.5"
                >
                  Email
                </label>
                <input
                  id="reset-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-bg-base border border-accent-cyan/20 rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder-text-tertiary focus:border-accent-cyan/50 focus:outline-none transition-colors"
                  placeholder="votre@email.fr"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand text-bg-base font-semibold py-3 rounded-lg hover:bg-brand-hover transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? "Envoi..." : "Envoyer le lien"}
              </button>
            </form>

            <p className="text-center text-xs text-text-tertiary mt-6">
              <a
                href="/login"
                className="text-accent-cyan hover:text-brand transition-colors"
              >
                Retour à la connexion
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
