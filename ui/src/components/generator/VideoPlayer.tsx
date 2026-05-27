import { useEffect, useMemo, useRef, useState } from "react";
import type { TranscriptSegment } from "@/types";

interface VideoPlayerProps {
  file: File;
  segments: TranscriptSegment[];
}

export function VideoPlayer({ file, segments }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentText, setCurrentText] = useState("");

  // Creeaza URL temporar din fisierul incarcat — revocat automat la unmount
  const objectUrl = useMemo(() => URL.createObjectURL(file), [file]);
  useEffect(() => () => URL.revokeObjectURL(objectUrl), [objectUrl]);

  const handleTimeUpdate = () => {
    const t = videoRef.current?.currentTime ?? 0;
    // Gaseste segmentul activ pe baza timpului curent al playerului
    const active = segments.find((s) => t >= s.start && t < s.end);
    setCurrentText(active?.text ?? "");
  };

  return (
    <div className="relative rounded-2xl overflow-hidden bg-black/60">
      <video
        ref={videoRef}
        src={objectUrl}
        onTimeUpdate={handleTimeUpdate}
        controls
        className="w-full max-h-[400px] object-contain"
      />

      {/* Subtitrare live — apare si dispare sincronizat cu playerul */}
      <div
        className={`
          absolute bottom-14 left-0 right-0 flex justify-center px-6
          pointer-events-none transition-opacity duration-200
          ${currentText ? "opacity-100" : "opacity-0"}
        `}
      >
        <span className="glass-caption rounded-xl px-5 py-2.5 text-white text-sm font-medium text-center max-w-lg leading-snug">
          {currentText}
        </span>
      </div>
    </div>
  );
}
