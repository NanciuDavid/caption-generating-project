export const BASE_URL = "/api";

export const API_ENDPOINTS = {
  GENERATE_FROM_TEXT: `${BASE_URL}/generate/text`,
  GENERATE_FROM_VIDEO: `${BASE_URL}/generate/video`,
  GENERATE_FROM_YOUTUBE: `${BASE_URL}/generate/youtube`,
  TRANSCRIBE_VIDEO: `${BASE_URL}/transcribe`,
  SCRAPE_URL: `${BASE_URL}/scrape/url`,
  GENERATE_HOOKS: `${BASE_URL}/generate/hooks`,
  GENERATE_BIO: `${BASE_URL}/generate/bio`,
  GENERATE_THREAD: `${BASE_URL}/generate/thread`,
};

export const PLATFORMS = ["LinkedIn", "TikTok", "Instagram"] as const;
export const TONES = ["profesional", "casual", "educational", "promotional"] as const;
export const DEFAULT_VARIANTS = 3;

export const LANGUAGES = [
  { code: "ro", label: "Română" },
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
  { code: "de", label: "Deutsch" },
] as const;

export const PLATFORM_CHAR_LIMITS: Record<string, number> = {
  LinkedIn: 3000,
  TikTok: 2200,
  Instagram: 2200,
};
