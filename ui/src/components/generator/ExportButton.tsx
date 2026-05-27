import { useState } from "react";
import type { GenerateResponse } from "@/types";

interface ExportButtonProps {
  result: GenerateResponse;
}

function buildCsv(result: GenerateResponse): string {
  const rows: string[] = ["Platform,Varianta,Caption,Hashtags"];
  for (const r of result.results) {
    r.variants.forEach((v, i) => {
      const caption = `"${v.caption.replace(/"/g, '""')}"`;
      const hashtags = `"${v.hashtags.join(" ")}"`;
      rows.push(`${r.platform},${i + 1},${caption},${hashtags}`);
    });
  }
  return rows.join("\n");
}

function buildTxt(result: GenerateResponse): string {
  const lines: string[] = [`Rezumat: ${result.summary}`, ""];
  for (const r of result.results) {
    lines.push(`=== ${r.platform} ===`);
    r.variants.forEach((v, i) => {
      lines.push(`\n[Varianta ${i + 1}]`);
      lines.push(v.caption);
      lines.push(v.hashtags.join(" "));
    });
    lines.push("");
  }
  return lines.join("\n");
}

function download(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function ExportButton({ result }: ExportButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="rounded-full glass-pill px-3 py-1 text-xs font-medium text-primary hover:opacity-80 transition-opacity flex items-center gap-1.5"
      >
        Export
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M2 3.5L5 6.5L8 3.5"/>
        </svg>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-8 z-20 glass rounded-xl p-1 min-w-[120px] shadow-lg">
            <button
              onClick={() => { download(buildCsv(result), "captions.csv", "text/csv"); setOpen(false); }}
              className="w-full text-left px-3 py-2 text-xs text-foreground hover:bg-black/5 rounded-lg transition-colors"
            >
              Export CSV
            </button>
            <button
              onClick={() => { download(buildTxt(result), "captions.txt", "text/plain"); setOpen(false); }}
              className="w-full text-left px-3 py-2 text-xs text-foreground hover:bg-black/5 rounded-lg transition-colors"
            >
              Export TXT
            </button>
          </div>
        </>
      )}
    </div>
  );
}
