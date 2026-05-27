import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { scrapeUrl } from "@/services/appService";

export function UrlInput() {
  const { setTextInput } = useApp();
  const [url, setUrl] = useState("");
  const [scraping, setScraping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleScrape = async () => {
    if (!url.trim()) return;
    setScraping(true);
    setError(null);
    setSuccess(false);
    try {
      const { text } = await scrapeUrl(url.trim());
      setTextInput(text);
      setSuccess(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Eroare la accesarea URL-ului");
    } finally {
      setScraping(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <input
          type="url"
          value={url}
          onChange={(e) => { setUrl(e.target.value); setSuccess(false); setError(null); }}
          onKeyDown={(e) => e.key === "Enter" && handleScrape()}
          placeholder="https://example.com/articol..."
          className="glass-sm flex-1 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <button
          onClick={handleScrape}
          disabled={scraping || !url.trim()}
          className="rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-40 whitespace-nowrap"
        >
          {scraping ? "..." : "Extrage"}
        </button>
      </div>
      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}
      {success && (
        <p className="text-xs text-primary font-medium">Text extras cu succes. Alege platformele si genereaza.</p>
      )}
    </div>
  );
}
