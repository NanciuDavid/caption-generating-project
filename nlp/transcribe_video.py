import os
from groq import Groq

_client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

MAX_FILE_SIZE_MB = 25
SUPPORTED_FORMATS = {".mp3", ".mp4", ".mpeg", ".mpga", ".m4a", ".wav", ".ogg", ".webm", ".flac", ".mov"}


def transcribe_audio(file_path: str, language: str = "ro") -> dict:
    # Transcriere prin Groq Whisper-large-v3.
    # Foloseste verbose_json pentru a obtine si segmentele cu timestamp —
    # necesare pentru subtitrari sincronizate in playerul video din frontend.
    if not os.path.exists(file_path):
        return {"status": "failed", "error": f"Fisierul '{file_path}' nu exista."}

    ext = os.path.splitext(file_path)[1].lower()
    if ext not in SUPPORTED_FORMATS:
        return {"status": "failed", "error": f"Format nesupport: '{ext}'."}

    size_mb = os.path.getsize(file_path) / (1024 * 1024)
    if size_mb > MAX_FILE_SIZE_MB:
        return {"status": "failed", "error": f"Fisier prea mare ({size_mb:.1f} MB). Limita: {MAX_FILE_SIZE_MB} MB."}

    try:
        with open(file_path, "rb") as f:
            result = _client.audio.transcriptions.create(
                file=(os.path.basename(file_path), f.read()),
                model="whisper-large-v3",
                language=language,
                # verbose_json returneaza si segmentele cu start/end in secunde
                response_format="verbose_json",
                timestamp_granularities=["segment"],
            )

        def _seg(s) -> dict:
            if isinstance(s, dict):
                return {"start": s["start"], "end": s["end"], "text": s.get("text", "").strip()}
            return {"start": s.start, "end": s.end, "text": s.text.strip()}

        segments = [_seg(s) for s in (result.segments or [])]

        return {
            "status": "success",
            "transcript": result.text.strip(),
            "segments": segments,
            "language": language,
        }

    except Exception as e:
        return {"status": "failed", "error": str(e)}


if __name__ == "__main__":
    import sys
    test_file = sys.argv[1] if len(sys.argv) > 1 else "audio/Test_Audio.mp3"
    print(f"Fisier: {os.path.abspath(test_file)}\n")
    result = transcribe_audio(test_file)
    print(f"Status: {result['status']}")
    if result["status"] == "success":
        print(f"Transcript: {result['transcript']}")
        print(f"Segmente: {len(result['segments'])}")
    else:
        print(f"Eroare: {result['error']}")
