import { createContext, useContext, useState, type ReactNode } from "react";
import { PLATFORMS } from "@/constants/appConst";
import { useTheme } from "@/hooks/useTheme";
import { useHistory } from "@/hooks/useHistory";
import type { GenerateResponse, Platform, Tone, Language, HistoryEntry, AnyResult } from "@/types";

interface AppContextValue {
  // Input state
  textInput: string;
  setTextInput: (v: string) => void;
  videoFile: File | null;
  setVideoFile: (f: File | null) => void;

  // Generation config
  platforms: Platform[];
  togglePlatform: (p: Platform) => void;
  tone: Tone;
  setTone: (t: Tone) => void;
  variants: number;
  setVariants: (n: number) => void;
  language: Language;
  setLanguage: (l: Language) => void;
  brandVoice: string;
  setBrandVoice: (v: string) => void;

  // Result state
  result: GenerateResponse | null;
  setResult: (r: GenerateResponse | null) => void;
  loading: boolean;
  setLoading: (b: boolean) => void;
  error: string | null;
  setError: (e: string | null) => void;

  // History
  history: HistoryEntry[];
  addToHistory: (entry: { type: HistoryEntry["type"]; preview: string; result: AnyResult }) => void;
  clearHistory: () => void;

  // Theme
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [textInput, setTextInput] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [platforms, setPlatforms] = useState<Platform[]>([...PLATFORMS]);
  const [tone, setTone] = useState<Tone>("profesional");
  const [variants, setVariants] = useState(3);
  const [language, setLanguage] = useState<Language>("ro");
  const [brandVoice, setBrandVoice] = useState("");
  const [result, setResult] = useState<GenerateResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { theme, toggleTheme } = useTheme();
  const { history, addToHistory, clearHistory } = useHistory();

  const togglePlatform = (p: Platform) =>
    setPlatforms((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));

  return (
    <AppContext.Provider
      value={{
        textInput, setTextInput,
        videoFile, setVideoFile,
        platforms, togglePlatform,
        tone, setTone,
        variants, setVariants,
        language, setLanguage,
        brandVoice, setBrandVoice,
        result, setResult,
        loading, setLoading,
        error, setError,
        history, addToHistory, clearHistory,
        theme, toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
