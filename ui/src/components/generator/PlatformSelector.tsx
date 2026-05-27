import { PLATFORMS } from "@/constants/appConst";
import { useApp } from "@/context/AppContext";

export function PlatformSelector() {
  const { platforms, togglePlatform } = useApp();
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">Platforme</label>
      <div className="flex flex-wrap gap-2">
        {PLATFORMS.map((p) => {
          const active = platforms.includes(p);
          return (
            <button
              key={p}
              type="button"
              onClick={() => togglePlatform(p)}
              className={`
                rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200
                ${active
                  ? "glass-pill text-primary"
                  : "border border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                }
              `}
            >
              {p}
            </button>
          );
        })}
      </div>
    </div>
  );
}
