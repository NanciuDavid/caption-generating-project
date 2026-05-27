import { API_ENDPOINTS, DEFAULT_VARIANTS } from "@/constants/appConst";
import type { CaptionVariant, GenerateRequest, GenerateResponse, Platform } from "@/types";

const USE_MOCK = true;

const mockHashtags: Record<Platform, string[]> = {
  LinkedIn: ["#leadership", "#career", "#innovation", "#productivity", "#growth"],
  TikTok: ["#fyp", "#viral", "#trending", "#learnontiktok", "#tips"],
  Instagram: ["#inspiration", "#lifestyle", "#daily", "#motivation", "#community"],
};

function buildMockVariants(platform: Platform, tone: string, summary: string, count: number): CaptionVariant[] {
  const base = summary.slice(0, 140) || "Continut interesant de explorat";
  const flair: Record<Platform, string> = {
    LinkedIn: "Ce parere ai?",
    TikTok: "🚀✨",
    Instagram: "💫",
  };
  return Array.from({ length: count }, (_, i) => ({
    caption: `[${platform} · ${tone}] Varianta ${i + 1}: ${base} ${flair[platform]}`,
    hashtags: mockHashtags[platform].slice(0, 5),
  }));
}

async function mockGenerate(req: GenerateRequest): Promise<GenerateResponse> {
  await new Promise((r) => setTimeout(r, 700));
  const summary = req.content
    ? `Rezumat: ${req.content.slice(0, 220)}${req.content.length > 220 ? "..." : ""}`
    : `Rezumat extras din video: ${req.videoFile?.name ?? "fisier"}`;
  return {
    summary,
    results: req.platforms.map((p) => ({
      platform: p,
      variants: buildMockVariants(p, req.tone, summary, req.variants ?? DEFAULT_VARIANTS),
    })),
  };
}

export async function generateFromText(req: GenerateRequest): Promise<GenerateResponse> {
  if (USE_MOCK) return mockGenerate(req);
  const res = await fetch(API_ENDPOINTS.GENERATE_FROM_TEXT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: req.content,
      platforms: req.platforms,
      tone: req.tone,
      variants: req.variants ?? DEFAULT_VARIANTS,
    }),
  });
  if (!res.ok) throw new Error(`Generare esuata: ${res.status}`);
  return res.json();
}

export async function generateFromVideo(req: GenerateRequest): Promise<GenerateResponse> {
  if (USE_MOCK) return mockGenerate(req);
  const fd = new FormData();
  if (req.videoFile) fd.append("video", req.videoFile);
  fd.append("platforms", JSON.stringify(req.platforms));
  fd.append("tone", req.tone);
  fd.append("variants", String(req.variants ?? DEFAULT_VARIANTS));
  const res = await fetch(API_ENDPOINTS.GENERATE_FROM_VIDEO, { method: "POST", body: fd });
  if (!res.ok) throw new Error(`Procesare video esuata: ${res.status}`);
  return res.json();
}
