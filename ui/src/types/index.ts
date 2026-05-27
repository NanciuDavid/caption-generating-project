import { PLATFORMS, TONES, LANGUAGES } from "@/constants/appConst";

export type Platform = (typeof PLATFORMS)[number];
export type Tone = (typeof TONES)[number];
export type Language = (typeof LANGUAGES)[number]["code"];

export interface GenerateRequest {
  content?: string;
  videoFile?: File;
  platforms: Platform[];
  tone: Tone;
  variants?: number;
  language?: Language;
  brandVoice?: string;
}

export interface CaptionVariant {
  caption: string;
  hashtags: string[];
}

export interface PlatformResult {
  platform: Platform;
  variants: CaptionVariant[];
}

export interface TranscriptSegment {
  start: number;
  end: number;
  text: string;
}

export interface GenerateResponse {
  summary: string;
  results: PlatformResult[];
  transcript?: string;
  segments?: TranscriptSegment[];
}

export interface HookResponse {
  hooks: string[];
}

export interface BioVariant {
  platform: string;
  bio: string;
}

export interface BioResponse {
  bios: BioVariant[];
}

export interface ThreadResponse {
  thread: string[];
}

export type AnyResult = GenerateResponse | HookResponse | BioResponse | ThreadResponse;

export interface HistoryEntry {
  id: string;
  timestamp: number;
  type: "text" | "video" | "youtube" | "hook" | "bio" | "thread";
  preview: string;
  result: AnyResult;
}
