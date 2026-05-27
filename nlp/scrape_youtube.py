import os

import yt_dlp


def download_youtube_audio(url: str, output_dir: str) -> dict:
    # Descarca pista audio dintr-un video YouTube folosind yt-dlp.
    # Returneaza calea catre fisierul descarcat sau un mesaj de eroare.
    output_template = os.path.join(output_dir, "%(id)s.%(ext)s")
    ydl_opts = {
        "format": "bestaudio[ext=m4a]/bestaudio[ext=webm]/bestaudio/best",
        "outtmpl": output_template,
        "quiet": True,
        "no_warnings": True,
        # Nu rula postprocesare FFmpeg — Groq Whisper accepta m4a/webm nativ
        "nopostoverwrites": True,
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)
            title = info.get("title", "YouTube Video")
            video_id = info.get("id", "audio")
            duration = info.get("duration", 0)

            # Limita: Groq Whisper accepta maxim ~25 MB / ~25 minute
            if duration and duration > 1500:
                return {"status": "error", "error": f"Videoclipul este prea lung ({duration // 60} min). Limita: 25 minute."}

        # Cauta fisierul descarcat in output_dir
        for fname in os.listdir(output_dir):
            if fname.startswith(video_id):
                return {
                    "status": "success",
                    "path": os.path.join(output_dir, fname),
                    "title": title,
                }

        # Fallback: primul fisier din director
        files = [f for f in os.listdir(output_dir) if os.path.isfile(os.path.join(output_dir, f))]
        if files:
            return {"status": "success", "path": os.path.join(output_dir, files[0]), "title": title}

        return {"status": "error", "error": "Fisierul audio nu a fost gasit dupa descarcare."}

    except yt_dlp.utils.DownloadError as e:
        msg = str(e)
        if "Private video" in msg:
            return {"status": "error", "error": "Videoclipul este privat si nu poate fi descarcat."}
        if "not available" in msg.lower():
            return {"status": "error", "error": "Videoclipul nu este disponibil in aceasta regiune."}
        return {"status": "error", "error": f"Eroare la descarcare: {msg[:200]}"}
    except Exception as e:
        return {"status": "error", "error": str(e)}
