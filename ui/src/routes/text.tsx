import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useApp } from "@/context/AppContext";
import { TextInput } from "@/components/generator/TextInput";
import { UrlInput } from "@/components/generator/UrlInput";
import { PlatformSelector } from "@/components/generator/PlatformSelector";
import { ToneSelector } from "@/components/generator/ToneSelector";
import { VariantsSlider } from "@/components/generator/VariantsSlider";
import { LanguageSelector } from "@/components/generator/LanguageSelector";
import { BrandVoiceInput } from "@/components/generator/BrandVoiceInput";
import { ResultsView } from "@/components/generator/ResultsView";
import { generateFromText } from "@/services/appService";

export const Route = createFileRoute("/text")({
  head: () => ({ meta: [{ title: "Generator text — Scripty" }] }),
  component: TextPage,
});

type Tab = "text" | "url";

function TextPage() {
  const { textInput, platforms, tone, variants, language, brandVoice, setResult, setLoading, setError, loading, result, addToHistory } = useApp();
  const [tab, setTab] = useState<Tab>("text");

  const handleGenerate = async () => {
    setError(null);
    if (!textInput.trim()) { setError("Lipeste un articol mai intai."); return; }
    if (platforms.length === 0) { setError("Selecteaza cel putin o platforma."); return; }
    setLoading(true);
    try {
      const r = await generateFromText({ content: textInput, platforms, tone, variants, language, brandVoice });
      setResult(r);
      addToHistory({ type: "text", preview: textInput.slice(0, 60), result: r });
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
        <h1 className="text-lg font-semibold text-foreground">Generator text</h1>
      </div>

      <div className="glass rounded-2xl p-6 space-y-5">
        {/* Tab switcher */}
        <div className="flex gap-1 glass-sm rounded-xl p-1">
          {(["text", "url"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 rounded-lg py-1.5 text-xs font-semibold transition-all ${
                tab === t ? "bg-accent text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t === "text" ? "Text direct" : "URL articol"}
            </button>
          ))}
        </div>

        {tab === "text" ? <TextInput /> : <UrlInput />}

        <div className="grid gap-4 sm:grid-cols-2">
          <PlatformSelector />
          <ToneSelector />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <VariantsSlider />
          <LanguageSelector />
        </div>

        <BrandVoiceInput />

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full rounded-xl bg-accent py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-40"
        >
          {loading ? "Se genereaza..." : "Genereaza"}
        </button>
      </div>

      {(result || loading) && (
        <div className="mt-6">
          <ResultsView />
        </div>
      )}
    </div>
  );
}
