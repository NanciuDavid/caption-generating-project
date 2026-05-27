import { TONES } from "@/constants/appConst";
import { useApp } from "@/context/AppContext";
import type { Tone } from "@/types";

export function ToneSelector() {
  const { tone, setTone } = useApp();
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-foreground">Ton postare</label>
      <select
        value={tone}
        onChange={(e) => setTone(e.target.value as Tone)}
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      >
        {TONES.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
    </div>
  );
}
