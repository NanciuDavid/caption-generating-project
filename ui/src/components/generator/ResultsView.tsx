import { useApp } from "@/context/AppContext";

export function ResultsView() {
  const { result, loading, error } = useApp();

  if (loading) {
    return (
      <div className="rounded-lg border border-border bg-card p-6 text-sm text-muted-foreground">
        Se genereaza...
      </div>
    );
  }
  if (error) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
        {error}
      </div>
    );
  }
  if (!result) return null;

  const copy = (text: string) => navigator.clipboard.writeText(text);

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-border bg-card p-4">
        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Rezumat</h3>
        <p className="text-sm text-card-foreground">{result.summary}</p>
      </section>

      {result.results.map((r) => (
        <section key={r.platform} className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">{r.platform}</h3>
          <div className="space-y-3">
            {r.variants.map((v, i) => {
              const full = `${v.caption}\n\n${v.hashtags.join(" ")}`;
              return (
                <div key={i} className="rounded-lg border border-border bg-card p-4">
                  <p className="mb-2 text-sm text-card-foreground">{v.caption}</p>
                  <p className="mb-3 text-sm font-medium text-primary">{v.hashtags.join(" ")}</p>
                  <button
                    onClick={() => copy(full)}
                    className="rounded-md border border-input bg-background px-3 py-1 text-xs font-medium text-foreground hover:bg-accent"
                  >
                    Copiaza
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
