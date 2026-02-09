"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
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
                Nouveau mot de passe
              </p>
            </div>

            {error && (
              <div className="mb-5 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleUpdate} className="space-y-5">
              <div>
                <label
                  htmlFor="new-password"
                  className="block text-sm text-text-secondary mb-1.5"
                >
                  Nouveau mot de passe
                </label>
                <div className="relative">
                  <input
                    id="new-password"
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

              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm text-text-secondary mb-1.5"
                >
                  Confirmer le mot de passe
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full bg-bg-base border border-accent-cyan/20 rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder-text-tertiary focus:border-accent-cyan/50 focus:outline-none transition-colors"
                  placeholder="Confirmez votre mot de passe"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand text-bg-base font-semibold py-3 rounded-lg hover:bg-brand-hover transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? "Mise à jour..." : "Mettre à jour"}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
