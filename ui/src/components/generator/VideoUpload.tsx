import { useApp } from "@/context/AppContext";

export function VideoUpload() {
  const { videoFile, setVideoFile } = useApp();
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-foreground">Sau incarca un video</label>
      <input
        type="file"
        accept="video/*"
        onChange={(e) => setVideoFile(e.target.files?.[0] ?? null)}
        className="block w-full text-sm text-muted-foreground file:mr-3 file:rounded-md file:border-0 file:bg-secondary file:px-3 file:py-2 file:text-sm file:font-medium file:text-secondary-foreground hover:file:bg-secondary/80"
      />
      {videoFile && <p className="text-xs text-muted-foreground">Selectat: {videoFile.name}</p>}
    </div>
  );
}
