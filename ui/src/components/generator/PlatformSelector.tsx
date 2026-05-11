import { PLATFORMS } from "@/constants/appConst";
import { useApp } from "@/context/AppContext";

export function PlatformSelector() {
  const { platforms, togglePlatform } = useApp();
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-foreground">Platforme</label>
      <div className="flex flex-wrap gap-2">
        {PLATFORMS.map((p) => {
          const active = platforms.includes(p);
          return (
            <button
              key={p}
              type="button"
              onClick={() => togglePlatform(p)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-input bg-background text-foreground hover:bg-accent"
              }`}
            >
              {p}
            </button>
          );
        })}
      </div>
    </div>
  );
}
