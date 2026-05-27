import { API_ENDPOINTS, DEFAULT_VARIANTS } from "@/constants/appConst";
import type {
  GenerateRequest,
  GenerateResponse,
  HookResponse,
  BioResponse,
  ThreadResponse,
  Platform,
  Language,
  Tone,
} from "@/types";

export async function generateFromText(req: GenerateRequest): Promise<GenerateResponse> {
  const res = await fetch(API_ENDPOINTS.GENERATE_FROM_TEXT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: req.content,
      platforms: req.platforms,
      tone: req.tone,
      variants: req.variants ?? DEFAULT_VARIANTS,
      language: req.language ?? "ro",
      brand_voice: req.brandVoice ?? "",
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail ?? `Eroare ${res.status}`);
  }
  return res.json();
}

export async function generateFromVideo(req: GenerateRequest): Promise<GenerateResponse> {
  const fd = new FormData();
  if (req.videoFile) fd.append("video", req.videoFile);
  fd.append("platforms", JSON.stringify(req.platforms));
  fd.append("tone", req.tone);
  fd.append("variants", String(req.variants ?? DEFAULT_VARIANTS));
  fd.append("language", req.language ?? "ro");
  fd.append("brand_voice", req.brandVoice ?? "");
  const res = await fetch(API_ENDPOINTS.GENERATE_FROM_VIDEO, { method: "POST", body: fd });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail ?? `Eroare ${res.status}`);
  }
  return res.json();
}

export async function generateFromYoutube(params: {
  url: string;
  platforms: Platform[];
  tone: Tone;
  variants: number;
  language: Language;
  brandVoice: string;
}): Promise<GenerateResponse> {
  const res = await fetch(API_ENDPOINTS.GENERATE_FROM_YOUTUBE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      url: params.url,
      platforms: params.platforms,
      tone: params.tone,
      variants: params.variants,
      language: params.language,
      brand_voice: params.brandVoice,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail ?? `Eroare ${res.status}`);
  }
  return res.json();
}

export async function scrapeUrl(url: string): Promise<{ text: string }> {
  const res = await fetch(API_ENDPOINTS.SCRAPE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail ?? `Eroare ${res.status}`);
  }
  return res.json();
}

export async function generateHooks(params: {
  text: string;
  count: number;
  language: Language;
}): Promise<HookResponse> {
  const res = await fetch(API_ENDPOINTS.GENERATE_HOOKS, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail ?? `Eroare ${res.status}`);
  }
  return res.json();
}

export async function generateBio(params: {
  description: string;
  platforms: Platform[];
  language: Language;
}): Promise<BioResponse> {
  const res = await fetch(API_ENDPOINTS.GENERATE_BIO, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail ?? `Eroare ${res.status}`);
  }
  return res.json();
}

export async function generateThread(params: {
  text: string;
  max_posts: number;
  language: Language;
  tone: Tone;
}): Promise<ThreadResponse> {
  const res = await fetch(API_ENDPOINTS.GENERATE_THREAD, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail ?? `Eroare ${res.status}`);
  }
  return res.json();
}
