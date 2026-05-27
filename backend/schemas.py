from typing import Literal, Optional
from pydantic import BaseModel, Field

Platform = Literal["LinkedIn", "TikTok", "Instagram"]
Tone = Literal["profesional", "casual", "educational", "promotional"]
Language = Literal["ro", "en", "fr", "es", "de"]


# ── Text generate ──────────────────────────────────────────────────────────

class TextGenerateRequest(BaseModel):
    content: str = Field(..., min_length=10)
    platforms: list[Platform] = Field(..., min_length=1)
    tone: Tone
    variants: int = Field(default=3, ge=1, le=5)
    language: Language = Field(default="ro")
    brand_voice: str = Field(default="")


# ── Video generate ─────────────────────────────────────────────────────────
# (video route uses Form fields, not JSON body — schema used only for response)

# ── Extras ────────────────────────────────────────────────────────────────

class HookRequest(BaseModel):
    text: str = Field(..., min_length=10)
    count: int = Field(default=5, ge=1, le=10)
    language: Language = Field(default="ro")


class BioRequest(BaseModel):
    description: str = Field(..., min_length=10)
    platforms: list[Platform] = Field(default=["LinkedIn", "TikTok", "Instagram"])
    language: Language = Field(default="ro")


class ThreadRequest(BaseModel):
    text: str = Field(..., min_length=10)
    max_posts: int = Field(default=10, ge=3, le=15)
    language: Language = Field(default="ro")
    tone: Tone = Field(default="profesional")


# ── Scrape ────────────────────────────────────────────────────────────────

class ScrapeUrlRequest(BaseModel):
    url: str = Field(..., min_length=10)


class YoutubeRequest(BaseModel):
    url: str = Field(..., min_length=10)
    platforms: list[Platform] = Field(..., min_length=1)
    tone: Tone = Field(default="profesional")
    variants: int = Field(default=3, ge=1, le=5)
    language: Language = Field(default="ro")
    brand_voice: str = Field(default="")


# ── Responses ─────────────────────────────────────────────────────────────

class TranscriptSegment(BaseModel):
    start: float
    end: float
    text: str


class CaptionVariant(BaseModel):
    caption: str
    hashtags: list[str]


class PlatformResult(BaseModel):
    platform: Platform
    variants: list[CaptionVariant]


class GenerateResponse(BaseModel):
    summary: str
    results: list[PlatformResult]
    transcript: Optional[str] = None
    segments: Optional[list[TranscriptSegment]] = None


class HookResponse(BaseModel):
    hooks: list[str]


class BioVariant(BaseModel):
    platform: str
    bio: str


class BioResponse(BaseModel):
    bios: list[BioVariant]


class ThreadResponse(BaseModel):
    thread: list[str]


class ScrapeResponse(BaseModel):
    text: str


class ErrorResponse(BaseModel):
    detail: str
