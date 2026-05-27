import { useApp } from "@/context/AppContext";

export function VariantsSlider() {
  const { variants, setVariants } = useApp();
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Variante
        </label>
        <span className="text-xs font-bold text-primary tabular-nums">{variants}</span>
      </div>
      <input
        type="range"
        min={1}
        max={5}
        value={variants}
        onChange={(e) => setVariants(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-primary"
        style={{ accentColor: "oklch(0.52 0.24 295)" }}
      />
      <div className="flex justify-between text-[10px] text-muted-foreground">
        <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
      </div>
    </div>
  );
}
