import { useApp } from "@/context/AppContext";
import { PlatformSelector } from "@/components/generator/PlatformSelector";
import { ToneSelector } from "@/components/generator/ToneSelector";
import { ResultsView } from "@/components/generator/ResultsView";
import { TextInput } from "@/components/generator/TextInput";
import { VideoUpload } from "@/components/generator/VideoUpload";
import { generateFromText, generateFromVideo } from "@/services/appService";

interface Props {
  mode: "text" | "video";
  title: string;
  subtitle: string;
}

export function GeneratorPage({ mode, title, subtitle }: Props) {
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
    <div className="mx-auto max-w-3xl px-5 py-10">
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-2">
          {mode === "text" ? "Mod articol" : "Mod video"}
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">{title}</h1>
        <p className="mt-2 text-muted-foreground">{subtitle}</p>
      </header>

      <div className="space-y-6 rounded-2xl bg-gradient-card border border-border/60 p-6 shadow-card">
        {mode === "text" ? <TextInput /> : <VideoUpload />}
        <div className="grid gap-5 sm:grid-cols-2">
          <PlatformSelector />
          <ToneSelector />
        </div>
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full rounded-xl bg-gradient-hero px-4 py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Se genereaza..." : "✨ Genereaza"}
        </button>
      </div>

      <div className="mt-8">
        <ResultsView />
      </div>
    </div>
  );
}
