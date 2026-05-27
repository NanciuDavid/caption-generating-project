from fastapi import APIRouter, HTTPException
from schemas import TextGenerateRequest, GenerateResponse
from generate_caption import generate_all_captions

router = APIRouter(tags=["Generare din text"])


@router.post("/generate/text", response_model=GenerateResponse)
async def generate_from_text(req: TextGenerateRequest):
    try:
        result = generate_all_captions(
            text=req.content,
            platforms=list(req.platforms),
            tone=req.tone,
            variants=req.variants,
            language=req.language,
            brand_voice=req.brand_voice,
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Eroare la generare: {str(e)}")
