from fastapi import APIRouter, HTTPException
from schemas import HookRequest, HookResponse, BioRequest, BioResponse, ThreadRequest, ThreadResponse
from generate_caption import generate_hooks, generate_bio, generate_thread

router = APIRouter(tags=["Generatoare extra"])


@router.post("/generate/hooks", response_model=HookResponse)
async def generate_hooks_endpoint(req: HookRequest):
    try:
        hooks = generate_hooks(
            text=req.text,
            count=req.count,
            language=req.language,
        )
        return {"hooks": hooks}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Eroare la generare hook-uri: {str(e)}")


@router.post("/generate/bio", response_model=BioResponse)
async def generate_bio_endpoint(req: BioRequest):
    try:
        bios = generate_bio(
            description=req.description,
            platforms=list(req.platforms),
            language=req.language,
        )
        return {"bios": bios}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Eroare la generare bio: {str(e)}")


@router.post("/generate/thread", response_model=ThreadResponse)
async def generate_thread_endpoint(req: ThreadRequest):
    try:
        thread = generate_thread(
            text=req.text,
            max_posts=req.max_posts,
            language=req.language,
            tone=req.tone,
        )
        return {"thread": thread}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Eroare la generare thread: {str(e)}")
