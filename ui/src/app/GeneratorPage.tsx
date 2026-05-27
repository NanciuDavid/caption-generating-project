import { useApp } from "@/context/AppContext";
import { PlatformSelector } from "@/components/generator/PlatformSelector";
import { ToneSelector } from "@/components/generator/ToneSelector";
import { ResultsView } from "@/components/generator/ResultsView";
import { TextInput } from "@/components/generator/TextInput";
import { VideoUpload } from "@/components/generator/VideoUpload";
import { generateFromText, generateFromVideo } from "@/services/appService";

interface Props {
  mode: "text" | "video";
}

export function GeneratorPage({ mode }: Props) {
  const {
    textInput, videoFile, platforms, tone,
    setResult, setLoading, setError, loading,
  } = useApp();

  const handleGenerate = async () => {
    setError(null);
    if (mode === "text" && !textInput.trim()) {
      setError("Introdu un articol sau text sursa.");
      return;
    }
    if (mode === "video" && !videoFile) {
      setError("Incarca un fisier video.");
      return;
    }
    if (platforms.length === 0) {
      setError("Selecteaza cel putin o platforma.");
      return;
    }
    setLoading(true);
    try {
      const res = mode === "video"
        ? await generateFromVideo({ videoFile: videoFile!, platforms, tone })
        : await generateFromText({ content: textInput, platforms, tone });
      setResult(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Eroare necunoscuta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-5 py-10">
      <div className="mb-7">
        <span className="text-xs text-muted-foreground uppercase tracking-wide">
          {mode === "text" ? "Sursa: text" : "Sursa: video"}
        </span>
        <h1 className="text-2xl font-bold text-foreground mt-1">
          {mode === "text" ? "Din articol in caption-uri" : "Din video in caption-uri"}
        </h1>
      </div>

      <div className="space-y-5 rounded-lg border border-border bg-card p-5">
        {mode === "text" ? <TextInput /> : <VideoUpload />}
        <div className="grid gap-4 sm:grid-cols-2">
          <PlatformSelector />
          <ToneSelector />
        </div>
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-40"
        >
          {loading ? "Se genereaza..." : "Genereaza"}
        </button>
      </div>

      <div className="mt-6">
        <ResultsView />
      </div>
    </div>
  );
}
