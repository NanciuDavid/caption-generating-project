import { useState } from "react";

interface YoutubeInputProps {
  value: string;
  onChange: (v: string) => void;
}

export function YoutubeInput({ value, onChange }: YoutubeInputProps) {
  const [focused, setFocused] = useState(false);

  const isValidUrl = value.includes("youtube.com/") || value.includes("youtu.be/");

  return (
    <div className="flex flex-col gap-2">
      <div className={`glass-sm rounded-xl flex items-center gap-3 px-4 py-3 transition-all ${focused ? "ring-2 ring-primary/30" : ""}`}>
        {/* YouTube icon */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-red-500 flex-shrink-0">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="https://youtube.com/watch?v=..."
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
        />
        {value && (
          <span className={`text-xs font-medium ${isValidUrl ? "text-primary" : "text-muted-foreground"}`}>
            {isValidUrl ? "✓" : "URL invalid"}
          </span>
        )}
      </div>
      <p className="text-[11px] text-muted-foreground">
        Videoclipul va fi transcris automat cu Whisper. Durata maxima: 25 minute.
      </p>
    </div>
  );
}
