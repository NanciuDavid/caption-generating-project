import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useApp } from "@/context/AppContext";
import { LanguageSelector } from "@/components/generator/LanguageSelector";
import { generateHooks } from "@/services/appService";
import type { HookResponse } from "@/types";

export const Route = createFileRoute("/hook")({
  head: () => ({ meta: [{ title: "Generator hook-uri — Scripty" }] }),
  component: HookPage,
});

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="rounded-full glass-pill px-3 py-1 text-xs font-medium text-primary hover:opacity-80 transition-opacity flex-shrink-0"
    >
      {copied ? "✓" : "Copiaza"}
    </button>
  );
}

function SkeletonHooks() {
  return (
    <div className="space-y-3 animate-pulse">
      {[1,2,3,4,5].map((i) => (
        <div key={i} className="glass rounded-2xl p-4 flex items-center gap-4">
          <div className="flex-1 space-y-2">
            <div className="skeleton h-4 w-full rounded-full" />
            <div className="skeleton h-4 w-3/4 rounded-full" />
          </div>
          <div className="skeleton h-6 w-16 rounded-full" />
        </div>
      ))}
    </div>
  );
}

function HookPage() {
  const { language, addToHistory } = useApp();
  const [text, setText] = useState("");
  const [count, setCount] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<HookResponse | null>(null);

  const handleGenerate = async () => {
    setError(null);
    if (!text.trim()) { setError("Introdu un text sau subiect mai intai."); return; }
    setLoading(true);
    try {
      const r = await generateHooks({ text, count, language });
      setResult(r);
      addToHistory({ type: "hook", preview: text.slice(0, 60), result: r });
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
        <h1 className="text-lg font-semibold text-foreground">Generator hook-uri</h1>
      </div>

      <div className="glass rounded-2xl p-6 space-y-5">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Text sau subiect
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Lipeste un articol, o idee sau descrie subiectul pentru care vrei hook-uri scriptyante..."
            rows={5}
            className="glass-sm rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 w-full"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Numar hook-uri
              </label>
              <span className="text-xs font-bold text-primary tabular-nums">{count}</span>
            </div>
            <input
              type="range" min={3} max={10} value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
              style={{ accentColor: "oklch(0.52 0.24 295)" }}
            />
          </div>
          <LanguageSelector />
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full rounded-xl bg-accent py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-40"
        >
          {loading ? "Se genereaza..." : "Genereaza hook-uri"}
        </button>
      </div>

      {error && (
        <div className="mt-4 rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {loading && <div className="mt-6"><SkeletonHooks /></div>}

      {result && !loading && (
        <div className="mt-6 space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            {result.hooks.length} hook-uri generate
          </p>
          {result.hooks.map((hook, i) => (
            <div key={i} className="glass rounded-2xl p-4 flex items-start gap-4">
              <span className="text-xs font-bold text-primary/50 tabular-nums mt-0.5 flex-shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="flex-1 text-sm text-foreground leading-relaxed">{hook}</p>
              <CopyButton text={hook} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
