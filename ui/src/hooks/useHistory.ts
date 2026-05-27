import { useState, useEffect } from "react";
import type { HistoryEntry, AnyResult } from "@/types";

const STORAGE_KEY = "scripty_history";
const MAX_ENTRIES = 10;

export function useHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch {}
  }, [history]);

  const addToHistory = (entry: {
    type: HistoryEntry["type"];
    preview: string;
    result: AnyResult;
  }) => {
    const newEntry: HistoryEntry = {
      ...entry,
      id: Date.now().toString(),
      timestamp: Date.now(),
    };
    setHistory((prev) => [newEntry, ...prev].slice(0, MAX_ENTRIES));
  };

  const clearHistory = () => setHistory([]);

  return { history, addToHistory, clearHistory };
}
