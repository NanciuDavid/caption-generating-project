import { useApp } from "@/context/AppContext";

export function TextInput() {
  const { textInput, setTextInput } = useApp();
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-foreground">Articol / text sursa</label>
      <textarea
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        placeholder="Lipeste aici articolul..."
        rows={7}
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}
