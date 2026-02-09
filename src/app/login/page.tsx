"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/dashboard";

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(
        error.message === "Invalid login credentials"
          ? "Email ou mot de passe incorrect."
          : error.message
      );
      setLoading(false);
      return;
    }

    router.push(redirectTo);
    router.refresh();
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-24 px-6 flex items-center justify-center min-h-[80vh]">
        <div className="w-full max-w-md">
          <div className="bg-bg-card border border-border-subtle rounded-2xl p-6 sm:p-8">
            {/* Logo */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-text-primary">
                Maitre<span className="text-brand">SEO</span>
              </h1>
              <p className="text-sm text-text-tertiary mt-2">Espace Client</p>
            </div>

            {error && (
              <div className="mb-5 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label
                  htmlFor="login-email"
                  className="block text-sm text-text-secondary mb-1.5"
                >
                  Email
                </label>
                <input
                  id="login-email"
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
                  htmlFor="login-password"
                  className="block text-sm text-text-secondary mb-1.5"
                >
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-bg-base border border-accent-cyan/20 rounded-lg px-4 py-2.5 pr-10 text-sm text-text-primary placeholder-text-tertiary focus:border-accent-cyan/50 focus:outline-none transition-colors"
                    placeholder="••••••••"
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

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-border-medium bg-bg-base accent-brand"
                  />
                  <span className="text-xs text-text-secondary">
                    Se souvenir de moi
                  </span>
                </label>
                <a
                  href="/reset-password"
                  className="text-xs text-accent-cyan hover:text-brand transition-colors"
                >
                  Mot de passe oublié ?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand text-bg-base font-semibold py-3 rounded-lg hover:bg-brand-hover transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? "Connexion..." : "Se connecter"}
              </button>
            </form>

            <p className="text-center text-xs text-text-tertiary mt-6">
              Pas encore de compte ?{" "}
              <a
                href="/signup"
                className="text-accent-cyan hover:text-brand transition-colors"
              >
                Créer un compte
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
