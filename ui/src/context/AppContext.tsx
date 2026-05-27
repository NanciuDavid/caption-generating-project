import { createContext, useContext, useState, type ReactNode } from "react";
import { PLATFORMS } from "@/constants/appConst";
import type { GenerateResponse, Platform, Tone } from "@/types";

interface AppContextValue {
  textInput: string;
  setTextInput: (v: string) => void;
  videoFile: File | null;
  setVideoFile: (f: File | null) => void;
  platforms: Platform[];
  togglePlatform: (p: Platform) => void;
  tone: Tone;
  setTone: (t: Tone) => void;
  result: GenerateResponse | null;
  setResult: (r: GenerateResponse | null) => void;
  loading: boolean;
  setLoading: (b: boolean) => void;
  error: string | null;
  setError: (e: string | null) => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [textInput, setTextInput] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [platforms, setPlatforms] = useState<Platform[]>([...PLATFORMS]);
  const [tone, setTone] = useState<Tone>("profesional");
  const [result, setResult] = useState<GenerateResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const togglePlatform = (p: Platform) =>
    setPlatforms((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));

  return (
    <AppContext.Provider
      value={{
        textInput, setTextInput,
        videoFile, setVideoFile,
        platforms, togglePlatform,
        tone, setTone,
        result, setResult,
        loading, setLoading,
        error, setError,
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
