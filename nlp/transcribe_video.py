# pip install openai-whisper
#python -m pip install torch torchvision torchaudio  
import whisper
import os
import torch
import shutil
import subprocess


device = 'cuda' if torch.cuda.is_available() else 'cpu'
model = whisper.load_model("medium").to(device)

def transcribe_audio(file_path: str) -> dict:
    try:
        if not os.path.exists(file_path):
            return {
                "error": f"Fisierul {file_path} nu exista",
                "status": "failed"
            }

        
        result = model.transcribe(file_path, language="ro")

        return {
            "status": "success",
            "transcript": result["text"],
            "file_path": file_path,
            "language": result.get("language", "unknown")
        }

    except Exception as e:
        return {
            "error": str(e),
            "status": "failed"
        }

if __name__ == "__main__":
    test_file = r"C:\Users\nanci\Desktop\caption-generating-project\nlp\audio\test_audio.mp3"
    print(test_file)

    print(f"Fisier: {os.path.abspath(test_file)}\n")

    result = transcribe_audio(test_file)
    print(f"\nStatus: {result.get('status')}")

    if result.get("status") == "success":
        print(f"Transcript:\n{result.get('transcript')}")
    else:
        print(f"Eroare: {result.get('error')}")