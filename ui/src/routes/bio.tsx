import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useApp } from "@/context/AppContext";
import { PlatformSelector } from "@/components/generator/PlatformSelector";
import { LanguageSelector } from "@/components/generator/LanguageSelector";
import { generateBio } from "@/services/appService";
import type { BioResponse } from "@/types";

export const Route = createFileRoute("/bio")({
  head: () => ({ meta: [{ title: "Generator bio — Scripty" }] }),
  component: BioPage,
});

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="rounded-full glass-pill px-3 py-1 text-xs font-medium text-primary hover:opacity-80 transition-opacity"
    >
      {copied ? "Copiat ✓" : "Copiaza"}
    </button>
  );
}

function SkeletonBio() {
  return (
    <div className="space-y-3 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="glass rounded-2xl p-5 space-y-3">
          <div className="skeleton h-3 w-20 rounded-full" />
          <div className="skeleton h-4 w-full rounded-full" />
          <div className="skeleton h-4 w-4/5 rounded-full" />
        </div>
      ))}
    </div>
  );
}

function BioPage() {
  const { platforms, language, addToHistory } = useApp();
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<BioResponse | null>(null);

  const handleGenerate = async () => {
    setError(null);
    if (!description.trim()) { setError("Descrie-te sau descrie brandul tau mai intai."); return; }
    if (platforms.length === 0) { setError("Selecteaza cel putin o platforma."); return; }
    setLoading(true);
    try {
      const r = await generateBio({ description, platforms, language });
      setResult(r);
      addToHistory({ type: "bio", preview: description.slice(0, 60), result: r });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Eroare necunoscuta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-6 py-12 pb-24">
      <div className="mb-8 flex items-center gap-3">
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">← Acasa</Link>
        <span className="text-border">·</span>
        <h1 className="text-lg font-semibold text-foreground">Generator bio</h1>
      </div>

      <div className="glass rounded-2xl p-6 space-y-5">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Descriere / Persona
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ex: Antreprenor in tech, fondator al unui startup de AI, pasionat de productivitate si invatare continua. Ajut echipele sa lucreze mai eficient."
            rows={4}
            className="glass-sm rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 w-full"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <PlatformSelector />
          <LanguageSelector />
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full rounded-xl bg-accent py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-40"
        >
          {loading ? "Se genereaza..." : "Genereaza bio-uri"}
        </button>
      </div>

      {error && (
        <div className="mt-4 rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {loading && <div className="mt-6"><SkeletonBio /></div>}

      {result && !loading && (
        <div className="mt-6 space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Bio-uri generate
          </p>
          {result.bios.map((b, i) => (
            <div key={i} className="glass rounded-2xl p-5 space-y-3">
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                {b.platform}
              </p>
              <p className="text-sm text-foreground leading-relaxed">{b.bio}</p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground tabular-nums">{b.bio.length} caractere</span>
                <CopyButton text={b.bio} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
