import { useApp } from "@/context/AppContext";

export function BrandVoiceInput() {
  const { brandVoice, setBrandVoice } = useApp();
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Voce de brand (optional)
      </label>
      <textarea
        value={brandVoice}
        onChange={(e) => setBrandVoice(e.target.value)}
        placeholder="Ex: Ton optimist, folosim 'tu' in loc de 'dumneavoastra', evitam jargonul tehnic..."
        rows={2}
        className="glass-sm rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 w-full"
      />
    </div>
  );
}
