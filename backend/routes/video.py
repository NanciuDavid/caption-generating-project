import json
import os
import tempfile

from fastapi import APIRouter, File, Form, HTTPException, UploadFile
from schemas import GenerateResponse
from generate_caption import generate_all_captions
from transcribe_video import transcribe_audio

router = APIRouter(tags=["Generare din video"])

ALLOWED_EXTENSIONS = {".mp4", ".mov", ".avi", ".mkv", ".mp3", ".wav", ".m4a", ".webm"}


@router.post("/generate/video", response_model=GenerateResponse)
async def generate_from_video(
    video: UploadFile = File(...),
    platforms: str = Form(...),
    tone: str = Form(...),
    variants: int = Form(default=3),
    language: str = Form(default="ro"),
    brand_voice: str = Form(default=""),
):
    ext = os.path.splitext(video.filename or "")[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=422, detail=f"Format nesupport: '{ext}'.")

    try:
        platform_list = json.loads(platforms)
    except json.JSONDecodeError:
        raise HTTPException(status_code=422, detail="'platforms' trebuie sa fie JSON valid.")

    tmp_path = None
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=ext) as tmp:
            tmp.write(await video.read())
            tmp_path = tmp.name

        transcript_result = transcribe_audio(tmp_path, language=language)
        if transcript_result.get("status") != "success":
            raise HTTPException(status_code=422, detail=transcript_result.get("error"))

        transcript = transcript_result["transcript"]
        segments = transcript_result.get("segments", [])

        result = generate_all_captions(
            text=transcript,
            platforms=platform_list,
            tone=tone,
            variants=variants,
            language=language,
            brand_voice=brand_voice,
        )
        result["transcript"] = transcript
        result["segments"] = segments
        return result

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if tmp_path and os.path.exists(tmp_path):
            os.unlink(tmp_path)


@router.post("/transcribe", tags=["Utilitar"])
async def transcribe_only(
    video: UploadFile = File(...),
    language: str = Form(default="ro"),
):
    ext = os.path.splitext(video.filename or "")[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=422, detail=f"Format nesupport: '{ext}'")

    tmp_path = None
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=ext) as tmp:
            tmp.write(await video.read())
            tmp_path = tmp.name

        result = transcribe_audio(tmp_path, language=language)
        if result.get("status") != "success":
            raise HTTPException(status_code=422, detail=result.get("error"))

        return {
            "transcript": result["transcript"],
            "segments": result.get("segments", []),
            "language": result.get("language"),
        }
    finally:
        if tmp_path and os.path.exists(tmp_path):
            os.unlink(tmp_path)
