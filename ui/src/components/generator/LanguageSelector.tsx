import { useApp } from "@/context/AppContext";
import { LANGUAGES } from "@/constants/appConst";
import type { Language } from "@/types";

export function LanguageSelector() {
  const { language, setLanguage } = useApp();
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Limba
      </label>
      <div className="flex flex-wrap gap-1.5">
        {LANGUAGES.map(({ code, label }) => (
          <button
            key={code}
            onClick={() => setLanguage(code as Language)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
              language === code
                ? "glass-pill text-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground border border-border"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
