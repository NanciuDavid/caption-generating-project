import { useApp } from "@/context/AppContext";

export function TextInput() {
  const { textInput, setTextInput } = useApp();
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-foreground">Articol sau text sursa</label>
      <textarea
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        placeholder="Lipeste textul aici..."
        rows={7}
        className="
          w-full rounded-xl glass-sm px-4 py-3 text-sm text-foreground
          placeholder:text-muted-foreground/60 focus:outline-none
          focus:ring-2 focus:ring-primary/25 resize-none leading-relaxed
        "
      />
      {textInput.length > 0 && (
        <p className="text-right text-xs text-muted-foreground">{textInput.length} caractere</p>
      )}
    </div>
  );
}
