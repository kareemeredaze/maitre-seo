"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      setLoading(false);
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
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
                Vérifiez votre email
              </h2>
              <p className="text-sm text-text-secondary mb-6">
                Un email de confirmation a été envoyé à{" "}
                <span className="text-text-primary font-medium">{email}</span>.
                Cliquez sur le lien pour activer votre compte.
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
                Créer un compte
              </p>
            </div>

            {error && (
              <div className="mb-5 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-5">
              <div>
                <label
                  htmlFor="signup-name"
                  className="block text-sm text-text-secondary mb-1.5"
                >
                  Nom complet
                </label>
                <input
                  id="signup-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full bg-bg-base border border-accent-cyan/20 rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder-text-tertiary focus:border-accent-cyan/50 focus:outline-none transition-colors"
                  placeholder="Jean Dupont"
                />
              </div>

              <div>
                <label
                  htmlFor="signup-email"
                  className="block text-sm text-text-secondary mb-1.5"
                >
                  Email
                </label>
                <input
                  id="signup-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-bg-base border border-accent-cyan/20 rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder-text-tertiary focus:border-accent-cyan/50 focus:outline-none transition-colors"
                  placeholder="votre@email.fr"
                />
              </div>

              <div>
                <label
                  htmlFor="signup-password"
                  className="block text-sm text-text-secondary mb-1.5"
                >
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    className="w-full bg-bg-base border border-accent-cyan/20 rounded-lg px-4 py-2.5 pr-10 text-sm text-text-primary placeholder-text-tertiary focus:border-accent-cyan/50 focus:outline-none transition-colors"
                    placeholder="8 caractères minimum"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-secondary transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand text-bg-base font-semibold py-3 rounded-lg hover:bg-brand-hover transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? "Création..." : "Créer mon compte"}
              </button>
            </form>

            <p className="text-center text-xs text-text-tertiary mt-6">
              Déjà un compte ?{" "}
              <a
                href="/login"
                className="text-accent-cyan hover:text-brand transition-colors"
              >
                Se connecter
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
