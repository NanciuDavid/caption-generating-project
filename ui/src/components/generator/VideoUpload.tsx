import { useRef } from "react";
import { useApp } from "@/context/AppContext";

export function VideoUpload() {
  const { videoFile, setVideoFile } = useApp();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) setVideoFile(f);
  };

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-foreground">Fisier video sau audio</label>

      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        className="
          glass-sm rounded-xl p-8 flex flex-col items-center gap-3
          cursor-pointer hover:bg-black/[0.04] transition-colors duration-200
        "
      >
        <input
          ref={inputRef}
          type="file"
          accept="video/*,audio/*"
          className="hidden"
          onChange={(e) => setVideoFile(e.target.files?.[0] ?? null)}
        />

        {videoFile ? (
          <>
            <div className="w-10 h-10 rounded-xl glass-pill flex items-center justify-center text-lg">🎬</div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">{videoFile.name}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {(videoFile.size / (1024 * 1024)).toFixed(1)} MB · click pentru a schimba
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="w-10 h-10 rounded-xl glass-sm flex items-center justify-center text-muted-foreground text-xl">↑</div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Trage fisierul sau apasa pentru a alege</p>
              <p className="text-xs text-muted-foreground/60 mt-1">mp4 · mov · mp3 · wav · max 25 MB</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
