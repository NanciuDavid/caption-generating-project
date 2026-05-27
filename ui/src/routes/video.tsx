import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useApp } from "@/context/AppContext";
import { VideoUpload } from "@/components/generator/VideoUpload";
import { VideoPlayer } from "@/components/generator/VideoPlayer";
import { YoutubeInput } from "@/components/generator/YoutubeInput";
import { PlatformSelector } from "@/components/generator/PlatformSelector";
import { ToneSelector } from "@/components/generator/ToneSelector";
import { VariantsSlider } from "@/components/generator/VariantsSlider";
import { LanguageSelector } from "@/components/generator/LanguageSelector";
import { BrandVoiceInput } from "@/components/generator/BrandVoiceInput";
import { ResultsView } from "@/components/generator/ResultsView";
import { generateFromVideo, generateFromYoutube } from "@/services/appService";

export const Route = createFileRoute("/video")({
  head: () => ({ meta: [{ title: "Generator video — Scripty" }] }),
  component: VideoPage,
});

type Tab = "upload" | "youtube";

function VideoPage() {
  const {
    videoFile, platforms, tone, variants, language, brandVoice,
    setResult, setLoading, setError, loading, result, addToHistory,
  } = useApp();
  const [tab, setTab] = useState<Tab>("upload");
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const handleGenerate = async () => {
    setError(null);
    if (platforms.length === 0) { setError("Selecteaza cel putin o platforma."); return; }

    if (tab === "upload") {
      if (!videoFile) { setError("Incarca un fisier video mai intai."); return; }
      setLoading(true);
      try {
        const r = await generateFromVideo({ videoFile, platforms, tone, variants, language, brandVoice });
        setResult(r);
        addToHistory({ type: "video", preview: videoFile.name, result: r });
      } catch (e) {
        setError(e instanceof Error ? e.message : "Eroare necunoscuta");
      } finally {
        setLoading(false);
      }
    } else {
      if (!youtubeUrl.trim()) { setError("Introdu un URL YouTube valid."); return; }
      if (!youtubeUrl.includes("youtube.com/") && !youtubeUrl.includes("youtu.be/")) {
        setError("URL-ul nu pare a fi un link YouTube valid.");
        return;
      }
      setLoading(true);
      try {
        const r = await generateFromYoutube({ url: youtubeUrl, platforms, tone, variants, language, brandVoice });
        setResult(r);
        addToHistory({ type: "youtube", preview: youtubeUrl, result: r });
      } catch (e) {
        setError(e instanceof Error ? e.message : "Eroare necunoscuta");
      } finally {
        setLoading(false);
      }
    }
  };

  const segments = result?.segments ?? [];

  return (
    <div className="mx-auto max-w-2xl px-6 py-12 pb-24">
      <div className="mb-8 flex items-center gap-3">
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">← Acasa</Link>
        <span className="text-border">·</span>
        <h1 className="text-lg font-semibold text-foreground">Generator video</h1>
      </div>

      <div className="glass rounded-2xl p-6 space-y-5">
        {/* Tab switcher */}
        <div className="flex gap-1 glass-sm rounded-xl p-1">
          {(["upload", "youtube"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 rounded-lg py-1.5 text-xs font-semibold transition-all ${
                tab === t ? "bg-accent text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t === "upload" ? "Incarca fisier" : "YouTube URL"}
            </button>
          ))}
        </div>

        {tab === "upload" ? (
          <VideoUpload />
        ) : (
          <YoutubeInput value={youtubeUrl} onChange={setYoutubeUrl} />
        )}

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
          disabled={loading || (tab === "upload" && !videoFile)}
          className="w-full rounded-xl bg-accent py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-40"
        >
          {loading ? "Se proceseaza..." : "Transcrie si genereaza"}
        </button>
      </div>

      {videoFile && result && tab === "upload" && (
        <div className="mt-6">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
            {segments.length ? "Player · subtitrari sincronizate" : "Player"}
          </p>
          <div className="glass rounded-2xl overflow-hidden">
            <VideoPlayer file={videoFile} segments={segments} />
          </div>
        </div>
      )}

      {(result || loading) && (
        <div className="mt-6">
          <ResultsView />
        </div>
      )}
    </div>
  );
}
