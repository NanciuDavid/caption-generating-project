import { TONES } from "@/constants/appConst";
import { useApp } from "@/context/AppContext";
import type { Tone } from "@/types";

const LABELS: Record<Tone, string> = {
  profesional:  "Profesional",
  casual:       "Casual",
  educational:  "Educational",
  promotional:  "Promotional",
};

export function ToneSelector() {
  const { tone, setTone } = useApp();
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">Ton</label>
      <div className="flex flex-wrap gap-2">
        {TONES.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTone(t)}
            className={`
              rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200
              ${tone === t
                ? "glass-pill text-primary"
                : "border border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
              }
            `}
          >
            {LABELS[t]}
          </button>
        ))}
      </div>
    </div>
  );
}
