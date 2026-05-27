export const BASE_URL = "http://localhost:8000/api";

export const API_ENDPOINTS = {
  GENERATE_FROM_TEXT: `${BASE_URL}/generate/text`,
  GENERATE_FROM_VIDEO: `${BASE_URL}/generate/video`,
  TRANSCRIBE_VIDEO: `${BASE_URL}/transcribe`,
};

export const PLATFORMS = ["LinkedIn", "TikTok", "Instagram"] as const;
export const TONES = ["profesional", "casual", "educational", "promotional"] as const;
export const DEFAULT_VARIANTS = 3;
