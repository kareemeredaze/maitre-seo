"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Rocket,
  Receipt,
  ShieldCheck,
  UserCircle,
  LogOut,
  Link2,
  TrendingUp,
  BarChart3,
  Activity,
  CheckCircle,
  ExternalLink,
  CreditCard,
  Download,
  Eye,
  EyeOff,
  Globe,
  Mail,
  Phone,
  Building,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";

type Profile = Database["public"]["Tables"]["users"]["Row"];
type Campaign = Database["public"]["Tables"]["campaigns"]["Row"];
type Backlink = Database["public"]["Tables"]["backlinks"]["Row"];
type Invoice = Database["public"]["Tables"]["invoices"]["Row"];
type ActivityLog = Database["public"]["Tables"]["activity_log"]["Row"];

type Tab = "overview" | "campaigns" | "billing" | "security" | "profile";

const TABS = [
  { id: "overview" as Tab, label: "Vue d'ensemble", icon: LayoutDashboard },
  { id: "campaigns" as Tab, label: "Campagnes", icon: Rocket },
  { id: "billing" as Tab, label: "Facturation", icon: Receipt },
  { id: "security" as Tab, label: "Sécurité", icon: ShieldCheck },
  { id: "profile" as Tab, label: "Profil", icon: UserCircle },
];

/* ══════════════════════════════════════════════════════
   HOOKS
   ══════════════════════════════════════════════════════ */

function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(() => {
    setLoading(true);
    setError(null);
    fetch(url)
      .then(async (res) => {
        if (!res.ok) throw new Error("Erreur de chargement");
        return res.json();
      })
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [url]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch };
}

/* ══════════════════════════════════════════════════════
   SKELETON
   ══════════════════════════════════════════════════════ */

function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-border-subtle/30 rounded ${className}`}
    />
  );
}

function CardSkeleton() {
  return (
    <div className="bg-bg-card border border-border-subtle rounded-xl p-5">
      <Skeleton className="h-3 w-24 mb-3" />
      <Skeleton className="h-7 w-16" />
    </div>
  );
}

function ErrorBanner({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3">
      <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
      <p className="text-sm text-red-400 flex-1">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-xs text-red-400 hover:text-red-300 underline"
        >
          Réessayer
        </button>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   ANIMATED COUNTER
   ══════════════════════════════════════════════════════ */
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const duration = 1200;
    const steps = 30;
    const increment = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setValue(target);
        clearInterval(interval);
      } else {
        setValue(Math.round(current * 10) / 10);
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [target]);

  return (
    <span className="text-2xl font-bold text-text-primary tabular-nums">
      {Number.isInteger(value) ? value : value.toFixed(1)}
      {suffix}
    </span>
  );
}

/* ══════════════════════════════════════════════════════
   OVERVIEW TAB
   ══════════════════════════════════════════════════════ */
function OverviewTab({ profile }: { profile: Profile | null }) {
  const { data: campaigns, loading: cLoading, error: cError, refetch: cRefetch } =
    useFetch<Campaign[]>("/api/campaigns");
  const { data: activity, loading: aLoading } =
    useFetch<ActivityLog[]>("/api/activity");

  const activeCampaign = campaigns?.find((c) => c.status === "active");
  const totalDelivered = campaigns?.reduce((s, c) => s + c.delivered_links, 0) ?? 0;
  const totalTarget = campaigns?.reduce((s, c) => s + c.target_links, 0) ?? 0;

  const activityIcons: Record<string, typeof Link2> = {
    backlink: Link2,
    campaign: Rocket,
    invoice: Receipt,
    auth: ShieldCheck,
    profile: UserCircle,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">
          Bonjour{profile?.full_name ? `, ${profile.full_name.split(" ")[0]}` : ""}
        </h1>
        <p className="text-sm text-text-tertiary mt-1">
          Voici le résumé de votre activité SEO.
        </p>
      </div>

      {cError && <ErrorBanner message={cError} onRetry={cRefetch} />}

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cLoading ? (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        ) : (
          <>
            {[
              { label: "Backlinks Livrés", value: totalDelivered, icon: Link2 },
              { label: "Objectif Total", value: totalTarget, icon: BarChart3 },
              {
                label: "Progression",
                value: totalTarget ? Math.round((totalDelivered / totalTarget) * 100) : 0,
                suffix: "%",
                icon: TrendingUp,
              },
              { label: "Campagnes", value: campaigns?.length ?? 0, icon: Rocket },
            ].map((kpi) => (
              <div
                key={kpi.label}
                className="bg-bg-card border border-border-subtle rounded-xl p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-text-tertiary uppercase tracking-wider">
                    {kpi.label}
                  </span>
                  <kpi.icon className="w-4 h-4 text-accent-cyan" />
                </div>
                <AnimatedCounter target={kpi.value} suffix={kpi.suffix} />
              </div>
            ))}
          </>
        )}
      </div>

      {/* Active campaign */}
      {activeCampaign && (
        <div className="bg-bg-card border border-border-subtle rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-text-primary">
                {activeCampaign.name}
              </h3>
              <p className="text-xs text-text-tertiary mt-0.5">
                {activeCampaign.delivered_links} / {activeCampaign.target_links} liens livrés
              </p>
            </div>
            <span className="text-xs text-brand font-medium bg-brand/10 border border-brand/20 rounded-full px-2.5 py-0.5">
              En cours
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-bg-base overflow-hidden">
            <div
              className="h-full rounded-full bg-brand transition-all duration-1000"
              style={{
                width: `${activeCampaign.target_links ? (activeCampaign.delivered_links / activeCampaign.target_links) * 100 : 0}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Activity */}
      <div className="bg-bg-card border border-border-subtle rounded-xl p-6">
        <h3 className="text-sm font-bold text-text-primary mb-4">
          Activité récente
        </h3>
        {aLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="w-8 h-8 rounded-lg" />
                <div className="flex-1">
                  <Skeleton className="h-3 w-48 mb-1" />
                  <Skeleton className="h-2 w-20" />
                </div>
              </div>
            ))}
          </div>
        ) : activity && activity.length > 0 ? (
          <div className="space-y-3">
            {activity.slice(0, 5).map((item) => {
              const Icon = activityIcons[item.type] || Activity;
              return (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-bg-base border border-border-subtle flex items-center justify-center flex-shrink-0">
                    <Icon className="w-3.5 h-3.5 text-accent-cyan" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-text-primary truncate">{item.message}</p>
                    <p className="text-[10px] text-text-tertiary">
                      {new Date(item.created_at).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-text-tertiary">Aucune activité récente.</p>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   CAMPAIGNS TAB
   ══════════════════════════════════════════════════════ */
function CampaignsTab() {
  const { data: campaigns, loading, error, refetch } =
    useFetch<Campaign[]>("/api/campaigns");
  const [selected, setSelected] = useState(0);
  const [backlinks, setBacklinks] = useState<Backlink[]>([]);
  const [blLoading, setBlLoading] = useState(false);

  const campaign = campaigns?.[selected];

  useEffect(() => {
    if (!campaign) return;
    setBlLoading(true);
    fetch(`/api/campaigns/${campaign.id}`)
      .then((r) => r.json())
      .then((data) => setBacklinks(data.backlinks ?? []))
      .catch(() => setBacklinks([]))
      .finally(() => setBlLoading(false));
  }, [campaign]);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-40" />
        <div className="flex gap-3">
          <Skeleton className="h-20 flex-1 rounded-xl" />
          <Skeleton className="h-20 flex-1 rounded-xl" />
        </div>
        <Skeleton className="h-64 rounded-xl" />
      </div>
    );
  }

  if (error) return <ErrorBanner message={error} onRetry={refetch} />;
  if (!campaigns || campaigns.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-text-primary">Campagnes</h1>
        <div className="bg-bg-card border border-border-subtle rounded-xl p-8 text-center">
          <Rocket className="w-8 h-8 text-text-tertiary mx-auto mb-3" />
          <p className="text-sm text-text-secondary">Aucune campagne pour le moment.</p>
        </div>
      </div>
    );
  }

  const progress = campaign && campaign.target_links
    ? Math.round((campaign.delivered_links / campaign.target_links) * 100)
    : 0;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">Campagnes</h1>

      {/* Campaign selector */}
      <div className="flex gap-3 overflow-x-auto">
        {campaigns.map((c, i) => (
          <button
            key={c.id}
            onClick={() => setSelected(i)}
            className={`flex-shrink-0 bg-bg-card border rounded-xl p-4 text-left transition-colors ${
              selected === i
                ? "border-brand/50 shadow-[0_0_15px_rgba(0,255,157,0.08)]"
                : "border-border-subtle hover:border-border-medium"
            }`}
          >
            <p className="text-xs font-bold text-text-primary truncate max-w-[200px]">
              {c.name}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`text-[10px] font-medium rounded-full px-2 py-0.5 ${
                  c.status === "active"
                    ? "text-brand bg-brand/10"
                    : c.status === "completed"
                    ? "text-accent-cyan bg-accent-cyan/10"
                    : "text-text-tertiary bg-bg-base"
                }`}
              >
                {c.status === "active"
                  ? "En cours"
                  : c.status === "completed"
                  ? "Terminée"
                  : c.status === "paused"
                  ? "Pausée"
                  : "Brouillon"}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Campaign detail */}
      {campaign && (
        <div className="bg-bg-card border border-border-subtle rounded-xl p-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-base font-bold text-text-primary">
                {campaign.name}
              </h2>
              <p className="text-xs text-text-tertiary mt-0.5">
                {campaign.start_date
                  ? new Date(campaign.start_date).toLocaleDateString("fr-FR")
                  : "—"}{" "}
                →{" "}
                {campaign.end_date
                  ? new Date(campaign.end_date).toLocaleDateString("fr-FR")
                  : "—"}
              </p>
            </div>
            <div className="flex gap-3 text-xs">
              <div className="bg-bg-base border border-border-subtle rounded-lg px-3 py-2 text-center">
                <p className="text-text-tertiary">Liens</p>
                <p className="font-bold text-text-primary">
                  {campaign.delivered_links}/{campaign.target_links}
                </p>
              </div>
              <div className="bg-bg-base border border-border-subtle rounded-lg px-3 py-2 text-center">
                <p className="text-text-tertiary">Progression</p>
                <p className="font-bold text-text-primary">{progress}%</p>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-1.5 rounded-full bg-bg-base overflow-hidden mb-6">
            <div
              className="h-full rounded-full bg-brand"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Backlinks table */}
          <h3 className="text-sm font-bold text-text-primary mb-3">
            Backlinks livrés
          </h3>
          {blLoading ? (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-10 rounded" />
              ))}
            </div>
          ) : backlinks.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border-subtle">
                    <th className="text-left py-2 text-text-tertiary font-medium">URL</th>
                    <th className="text-center py-2 text-text-tertiary font-medium">DR</th>
                    <th className="text-center py-2 text-text-tertiary font-medium">Statut</th>
                    <th className="text-right py-2 text-text-tertiary font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {backlinks.map((bl) => (
                    <tr key={bl.id} className="border-b border-border-subtle/50">
                      <td className="py-2.5">
                        <div className="flex items-center gap-1.5 text-text-primary">
                          <ExternalLink className="w-3 h-3 text-accent-cyan flex-shrink-0" />
                          <span className="truncate max-w-[200px]">{bl.url}</span>
                        </div>
                      </td>
                      <td className="text-center py-2.5">
                        <span className="text-accent-cyan font-medium">{bl.dr}</span>
                      </td>
                      <td className="text-center py-2.5">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                            bl.status === "live"
                              ? "text-brand bg-brand/10"
                              : bl.status === "pending"
                              ? "text-yellow-400 bg-yellow-400/10"
                              : "text-red-400 bg-red-400/10"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              bl.status === "live"
                                ? "bg-brand"
                                : bl.status === "pending"
                                ? "bg-yellow-400"
                                : "bg-red-400"
                            }`}
                          />
                          {bl.status === "live"
                            ? "En ligne"
                            : bl.status === "pending"
                            ? "En attente"
                            : bl.status === "removed"
                            ? "Supprimé"
                            : "Remplacé"}
                        </span>
                      </td>
                      <td className="text-right py-2.5 text-text-tertiary">
                        {bl.live_date
                          ? new Date(bl.live_date).toLocaleDateString("fr-FR", {
                              day: "numeric",
                              month: "short",
                            })
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-xs text-text-tertiary">
              Aucun backlink livré pour cette campagne.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   BILLING TAB
   ══════════════════════════════════════════════════════ */
function BillingTab() {
  const { data: invoices, loading, error, refetch } =
    useFetch<Invoice[]>("/api/invoices");

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-40" />
        <div className="grid sm:grid-cols-3 gap-4">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
        <Skeleton className="h-48 rounded-xl" />
      </div>
    );
  }

  if (error) return <ErrorBanner message={error} onRetry={refetch} />;

  const pending = invoices?.find((i) => i.status === "pending");
  const totalPaid = invoices
    ?.filter((i) => i.status === "paid")
    .reduce((s, i) => s + Number(i.amount), 0) ?? 0;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">Facturation</h1>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-bg-card border border-border-subtle rounded-xl p-5">
          <p className="text-xs text-text-tertiary uppercase tracking-wider mb-2">
            Prochain paiement
          </p>
          <p className="text-xl font-bold text-text-primary">
            {pending ? `${Number(pending.amount).toLocaleString("fr-FR")} €` : "—"}
          </p>
          {pending && (
            <p className="text-[10px] text-text-tertiary mt-1">
              Échéance :{" "}
              {new Date(pending.due_date).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          )}
        </div>
        <div className="bg-bg-card border border-border-subtle rounded-xl p-5">
          <p className="text-xs text-text-tertiary uppercase tracking-wider mb-2">
            Total payé
          </p>
          <p className="text-xl font-bold text-brand">
            {totalPaid.toLocaleString("fr-FR")}&nbsp;€
          </p>
        </div>
        <div className="bg-bg-card border border-border-subtle rounded-xl p-5">
          <p className="text-xs text-text-tertiary uppercase tracking-wider mb-2">
            Factures
          </p>
          <p className="text-xl font-bold text-text-primary">{invoices?.length ?? 0}</p>
        </div>
      </div>

      {/* Invoices table */}
      <div className="bg-bg-card border border-border-subtle rounded-xl p-6">
        <h3 className="text-sm font-bold text-text-primary mb-4">Factures</h3>
        {invoices && invoices.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border-subtle">
                  <th className="text-left py-2 text-text-tertiary font-medium">N°</th>
                  <th className="text-left py-2 text-text-tertiary font-medium">Date</th>
                  <th className="text-right py-2 text-text-tertiary font-medium">Montant</th>
                  <th className="text-center py-2 text-text-tertiary font-medium">Statut</th>
                  <th className="text-right py-2 text-text-tertiary font-medium" />
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv.id} className="border-b border-border-subtle/50">
                    <td className="py-3 text-text-primary font-medium">{inv.number}</td>
                    <td className="py-3 text-text-secondary">
                      {new Date(inv.created_at).toLocaleDateString("fr-FR")}
                    </td>
                    <td className="py-3 text-right text-text-primary font-medium">
                      {Number(inv.amount).toLocaleString("fr-FR")}&nbsp;€
                    </td>
                    <td className="py-3 text-center">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                          inv.status === "paid"
                            ? "text-brand bg-brand/10"
                            : inv.status === "pending"
                            ? "text-yellow-400 bg-yellow-400/10"
                            : "text-red-400 bg-red-400/10"
                        }`}
                      >
                        {inv.status === "paid"
                          ? "Payée"
                          : inv.status === "pending"
                          ? "En attente"
                          : "En retard"}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      {inv.pdf_url && (
                        <a
                          href={inv.pdf_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent-cyan hover:text-brand transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-xs text-text-tertiary">Aucune facture.</p>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECURITY TAB
   ══════════════════════════════════════════════════════ */
function SecurityTab() {
  const [showNew, setShowNew] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const inputClass =
    "w-full bg-bg-base border border-accent-cyan/20 rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder-text-tertiary focus:border-accent-cyan/50 focus:outline-none transition-colors";

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (newPassword.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/security/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: newPassword }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Erreur lors de la mise à jour.");
    } else {
      setSuccess(true);
      setNewPassword("");
      setConfirmPassword("");
    }
    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">Sécurité</h1>

      <div className="bg-bg-card border border-border-subtle rounded-xl p-6">
        <h3 className="text-sm font-bold text-text-primary mb-4">
          Changer le mot de passe
        </h3>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 rounded-lg bg-brand/10 border border-brand/20 text-brand text-sm">
            Mot de passe mis à jour avec succès.
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
          <div>
            <label className="block text-xs text-text-secondary mb-1.5">
              Nouveau mot de passe
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={inputClass}
                placeholder="8 caractères minimum"
                required
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-secondary"
              >
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-xs text-text-secondary mb-1.5">
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={inputClass}
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-brand text-bg-base font-semibold px-6 py-2.5 rounded-lg hover:bg-brand-hover transition-colors text-sm disabled:opacity-50 flex items-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Mettre à jour
          </button>
        </form>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   PROFILE TAB
   ══════════════════════════════════════════════════════ */
function ProfileTab({ profile, onRefresh }: { profile: Profile | null; onRefresh: () => void }) {
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    company: "",
    company_website: "",
    company_sector: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (profile) {
      setForm({
        full_name: profile.full_name ?? "",
        phone: profile.phone ?? "",
        company: profile.company ?? "",
        company_website: profile.company_website ?? "",
        company_sector: profile.company_sector ?? "",
      });
    }
  }, [profile]);

  const inputClass =
    "w-full bg-bg-base border border-accent-cyan/20 rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder-text-tertiary focus:border-accent-cyan/50 focus:outline-none transition-colors";

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Erreur lors de la sauvegarde.");
    } else {
      setSuccess(true);
      onRefresh();
    }
    setLoading(false);
  }

  if (!profile) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-48 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">Profil</h1>

      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="p-3 rounded-lg bg-brand/10 border border-brand/20 text-brand text-sm">
          Profil mis à jour avec succès.
        </div>
      )}

      <form onSubmit={handleSave}>
        <div className="bg-bg-card border border-border-subtle rounded-xl p-6 mb-6">
          <h3 className="text-sm font-bold text-text-primary mb-4">
            Informations personnelles
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
            <div className="sm:col-span-2">
              <label className="block text-xs text-text-secondary mb-1.5">
                Nom complet
              </label>
              <input
                type="text"
                className={inputClass}
                value={form.full_name}
                onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs text-text-secondary mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                <input
                  type="email"
                  className={`${inputClass} pl-10 opacity-60`}
                  value={profile.email}
                  disabled
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-text-secondary mb-1.5">
                Téléphone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                <input
                  type="tel"
                  className={`${inputClass} pl-10`}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-bg-card border border-border-subtle rounded-xl p-6">
          <h3 className="text-sm font-bold text-text-primary mb-4">Entreprise</h3>
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
            <div>
              <label className="block text-xs text-text-secondary mb-1.5">Société</label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                <input
                  type="text"
                  className={`${inputClass} pl-10`}
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-text-secondary mb-1.5">Site web</label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                <input
                  type="text"
                  className={`${inputClass} pl-10`}
                  value={form.company_website}
                  onChange={(e) =>
                    setForm({ ...form, company_website: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs text-text-secondary mb-1.5">Secteur</label>
              <input
                type="text"
                className={inputClass}
                value={form.company_sector}
                onChange={(e) =>
                  setForm({ ...form, company_sector: e.target.value })
                }
              />
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-brand text-bg-base font-semibold px-6 py-2.5 rounded-lg hover:bg-brand-hover transition-colors text-sm disabled:opacity-50 flex items-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   MAIN DASHBOARD
   ══════════════════════════════════════════════════════ */
export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const { data: profile, loading: profileLoading, refetch: refetchProfile } =
    useFetch<Profile>("/api/profile");

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  const renderTab = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab profile={profile} />;
      case "campaigns":
        return <CampaignsTab />;
      case "billing":
        return <BillingTab />;
      case "security":
        return <SecurityTab />;
      case "profile":
        return <ProfileTab profile={profile} onRefresh={refetchProfile} />;
    }
  };

  return (
    <div className="min-h-screen bg-bg-base flex flex-col md:flex-row">
      {/* ── Desktop Sidebar ── */}
      <aside className="hidden md:flex flex-col w-56 border-r border-border-subtle bg-bg-card/50 fixed inset-y-0 left-0">
        <Link
          href="/"
          className="flex items-center gap-2 px-5 h-16 border-b border-border-subtle"
        >
          <span className="text-lg font-bold text-text-primary">
            Maitre<span className="text-brand">SEO</span>
          </span>
        </Link>

        <nav className="flex-1 py-4 px-3 space-y-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                activeTab === tab.id
                  ? "bg-brand/10 text-brand border border-brand/20"
                  : "text-text-secondary hover:text-text-primary hover:bg-bg-card-hover"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="border-t border-border-subtle p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-brand/10 border border-brand/30 flex items-center justify-center">
              <UserCircle className="w-4 h-4 text-brand" />
            </div>
            <div className="min-w-0">
              {profileLoading ? (
                <>
                  <Skeleton className="h-3 w-20 mb-1" />
                  <Skeleton className="h-2 w-28" />
                </>
              ) : (
                <>
                  <p className="text-xs font-bold text-text-primary truncate">
                    {profile?.full_name || "Utilisateur"}
                  </p>
                  <p className="text-[10px] text-text-tertiary truncate">
                    {profile?.email}
                  </p>
                </>
              )}
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs text-text-tertiary hover:text-red-400 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* ── Mobile Top Bar ── */}
      <div className="md:hidden flex items-center justify-between px-4 h-14 border-b border-border-subtle bg-bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <Link href="/" className="text-base font-bold text-text-primary">
          Maitre<span className="text-brand">SEO</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-xs text-text-secondary">
            {profile?.full_name?.split(" ")[0] || ""}
          </span>
          <button onClick={handleLogout}>
            <LogOut className="w-4 h-4 text-text-tertiary" />
          </button>
        </div>
      </div>

      {/* ── Main Content ── */}
      <main className="flex-1 md:ml-56 pb-20 md:pb-8">
        <div className="hidden md:flex items-center justify-between h-16 px-8 border-b border-border-subtle">
          <h2 className="text-sm text-text-tertiary">
            {TABS.find((t) => t.id === activeTab)?.label}
          </h2>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-brand" />
            <span className="text-xs text-text-secondary">Connecté</span>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">{renderTab()}</div>
      </main>

      {/* ── Mobile Bottom Tabs ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-bg-card/90 backdrop-blur-sm border-t border-border-subtle flex z-50">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 transition-colors ${
              activeTab === tab.id ? "text-brand" : "text-text-tertiary"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="text-[9px]">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
