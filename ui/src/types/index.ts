import { PLATFORMS, TONES } from "@/constants/appConst";

export type Platform = (typeof PLATFORMS)[number];
export type Tone = (typeof TONES)[number];

export interface GenerateRequest {
  content?: string;
  videoFile?: File;
  platforms: Platform[];
  tone: Tone;
  variants?: number;
}

export interface CaptionVariant {
  caption: string;
  hashtags: string[];
}

export interface PlatformResult {
  platform: Platform;
  variants: CaptionVariant[];
}

export interface GenerateResponse {
  summary: string;
  results: PlatformResult[];
}
