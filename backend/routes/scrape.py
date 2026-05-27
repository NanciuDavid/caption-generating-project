import shutil
import tempfile

from fastapi import APIRouter, HTTPException
from schemas import ScrapeUrlRequest, ScrapeResponse, YoutubeRequest, GenerateResponse
from scrape_url import scrape_url
from scrape_youtube import download_youtube_audio
from transcribe_video import transcribe_audio
from generate_caption import generate_all_captions

router = APIRouter(tags=["Scrapers"])


@router.post("/scrape/url", response_model=ScrapeResponse)
async def scrape_url_endpoint(req: ScrapeUrlRequest):
    result = scrape_url(req.url)
    if result["status"] != "success":
        raise HTTPException(status_code=422, detail=result["error"])
    return {"text": result["text"]}


@router.post("/generate/youtube", response_model=GenerateResponse)
async def generate_from_youtube(req: YoutubeRequest):
    tmpdir = tempfile.mkdtemp()
    try:
        dl_result = download_youtube_audio(req.url, tmpdir)
        if dl_result["status"] != "success":
            raise HTTPException(status_code=422, detail=dl_result["error"])

        transcript_result = transcribe_audio(dl_result["path"], language=req.language)
        if transcript_result.get("status") != "success":
            raise HTTPException(status_code=422, detail=transcript_result.get("error", "Transcrierea a esuat."))

        transcript = transcript_result["transcript"]
        segments = transcript_result.get("segments", [])

        result = generate_all_captions(
            text=transcript,
            platforms=list(req.platforms),
            tone=req.tone,
            variants=req.variants,
            language=req.language,
            brand_voice=req.brand_voice,
        )
        result["transcript"] = transcript
        result["segments"] = segments
        return result

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        shutil.rmtree(tmpdir, ignore_errors=True)
