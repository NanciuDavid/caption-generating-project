import sys
import os
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

_BASE = os.path.dirname(os.path.abspath(__file__))

sys.path.insert(0, _BASE)
NLP_DIR = os.path.join(_BASE, "..", "nlp")
sys.path.insert(0, os.path.abspath(NLP_DIR))

from routes import text as text_router
from routes import video as video_router
from routes import extras as extras_router
from routes import scrape as scrape_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    if not os.environ.get("GROQ_API_KEY"):
        print("ATENTIE: variabila GROQ_API_KEY nu este setata. Generarea va esua.")
    else:
        print("GROQ_API_KEY detectata. Backend pregatit.")
    yield


app = FastAPI(
    title="Caption Generator API",
    description="API pentru generarea automata de caption-uri, hook-uri, bio-uri si thread-uri",
    version="2.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://localhost:8080",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(text_router.router, prefix="/api")
app.include_router(video_router.router, prefix="/api")
app.include_router(extras_router.router, prefix="/api")
app.include_router(scrape_router.router, prefix="/api")


@app.get("/health", tags=["Utilitar"])
async def health_check():
    return {"status": "ok"}
