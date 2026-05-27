import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { PLATFORM_CHAR_LIMITS } from "@/constants/appConst";
import { SkeletonResults } from "./SkeletonResults";
import { ExportButton } from "./ExportButton";
import type { GenerateResponse } from "@/types";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="rounded-full glass-pill px-3 py-1 text-xs font-medium text-primary hover:opacity-80 transition-opacity"
    >
      {copied ? "Copiat ✓" : "Copiaza"}
    </button>
  );
}

function CharCounter({ text, platform }: { text: string; platform: string }) {
  const limit = PLATFORM_CHAR_LIMITS[platform] ?? 2200;
  const count = text.length;
  const pct = Math.min(count / limit, 1);
  const color = pct > 0.9 ? "text-destructive" : pct > 0.7 ? "text-amber-500" : "text-muted-foreground";
  return (
    <span className={`text-[10px] tabular-nums font-medium ${color}`}>
      {count}/{limit}
    </span>
  );
}

function CopyAllButton({ result, platform }: { result: GenerateResponse; platform: string }) {
  const [copied, setCopied] = useState(false);
  const pr = result.results.find((r) => r.platform === platform);
  if (!pr) return null;
  const all = pr.variants.map((v) => `${v.caption}\n\n${v.hashtags.join(" ")}`).join("\n\n---\n\n");
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(all);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="rounded-full px-3 py-1 text-xs font-medium text-muted-foreground border border-border hover:text-foreground transition-colors"
    >
      {copied ? "Copiat ✓" : "Copiaza toate"}
    </button>
  );
}

export function ResultsView() {
  const { result, loading, error } = useApp();

  if (loading) return <SkeletonResults />;

  if (error) {
    return (
      <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
        {error}
      </div>
    );
  }
  if (!result) return null;

  return (
    <div className="space-y-6">
      {/* Header row: rezumat label + export button */}
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Rezultate
        </p>
        <ExportButton result={result} />
      </div>

      {/* Rezumat */}
      <div className="glass rounded-2xl p-5">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Rezumat extras
        </p>
        <p className="text-sm text-foreground leading-relaxed">{result.summary}</p>
        {result.transcript && (
          <details className="mt-4">
            <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors select-none">
              Transcript complet
            </summary>
            <p className="mt-3 text-xs text-muted-foreground leading-relaxed">{result.transcript}</p>
          </details>
        )}
      </div>

      {/* Caption-uri per platforma */}
      {result.results.map((r) => (
        <div key={r.platform}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              {r.platform}
            </p>
            <CopyAllButton result={result} platform={r.platform} />
          </div>
          <div className="space-y-3">
            {r.variants.map((v, i) => (
              <div key={i} className="glass rounded-2xl p-5 space-y-3">
                <p className="text-sm text-foreground leading-relaxed">{v.caption}</p>
                <p className="text-xs text-primary/70 leading-relaxed">{v.hashtags.join("  ")}</p>
                <div className="flex items-center justify-between">
                  <CharCounter text={`${v.caption}\n\n${v.hashtags.join(" ")}`} platform={r.platform} />
                  <CopyButton text={`${v.caption}\n\n${v.hashtags.join(" ")}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
