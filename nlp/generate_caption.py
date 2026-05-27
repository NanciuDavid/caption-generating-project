import json
import os
import re

from groq import Groq

_client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

DEFAULT_MODEL = "llama-3.3-70b-versatile"

LANGUAGE_LABELS = {
    "ro": "romana",
    "en": "engleza",
    "fr": "franceza",
    "es": "spaniola",
    "de": "germana",
}

PLATFORM_CONFIG = {
    "LinkedIn": {
        "lungime_max": 300,
        "stil": "profesional si inspirational, axat pe valoare si expertiza",
        "numar_hashtag": 5,
        "format": "paragrafe scurte cu un mesaj clar si un call-to-action subtil",
    },
    "TikTok": {
        "lungime_max": 150,
        "stil": "energic, scurt, cu 1-2 emoji-uri relevante",
        "numar_hashtag": 8,
        "format": "fraze scurte cu ritm rapid, direct si captivant",
    },
    "Instagram": {
        "lungime_max": 220,
        "stil": "vizual, emotiv si narativ",
        "numar_hashtag": 10,
        "format": "storytelling cu atmosfera, poate include emoji-uri",
    },
}

TONE_CONFIG = {
    "profesional": "serios, formal, bazat pe fapte si expertiza",
    "casual": "relaxat, prietenos si conversational",
    "educational": "informativ, clar, structurat cu puncte cheie",
    "promotional": "convingator, orientat catre actiune, cu call-to-action explicit",
}

BIO_PLATFORM_CONFIG = {
    "LinkedIn": {"max_chars": 220, "note": "profesionala, fara emoji, cu keyword-uri relevante din domeniu"},
    "TikTok": {"max_chars": 80, "note": "scurta, cu 1-2 emoji, call-to-action clar"},
    "Instagram": {"max_chars": 150, "note": "cu personalitate, emoji optional, call-to-action sau link"},
}


def _chat(prompt: str, model: str = DEFAULT_MODEL) -> str:
    response = _client.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7,
    )
    return response.choices[0].message.content.strip()


def _extract_json(content: str) -> dict | None:
    try:
        json_match = re.search(r"\{.*\}", content, re.DOTALL)
        if json_match:
            return json.loads(json_match.group())
    except json.JSONDecodeError:
        pass
    return None


def summarize_text(
    text: str,
    model: str = DEFAULT_MODEL,
    language: str = "ro",
) -> str:
    lang = LANGUAGE_LABELS.get(language, "romana")
    prompt = f"""Sumarizeaza urmatorul text in maximum 3-4 propozitii in limba {lang}, pastrand ideile principale.
Raspunde doar cu rezumatul, fara alte explicatii sau titluri.

Text:
{text}"""
    return _chat(prompt, model)


def generate_caption_variants(
    summary: str,
    platform: str,
    tone: str,
    variants: int = 3,
    model: str = DEFAULT_MODEL,
    language: str = "ro",
    brand_voice: str = "",
) -> list[dict]:
    config = PLATFORM_CONFIG.get(platform, PLATFORM_CONFIG["Instagram"])
    tone_desc = TONE_CONFIG.get(tone, TONE_CONFIG["casual"])
    lang = LANGUAGE_LABELS.get(language, "romana")
    brand_voice_line = f"\n- Voce de brand personalizata: {brand_voice}" if brand_voice.strip() else ""

    prompt = f"""Genereaza exact {variants} variante de caption pentru {platform} pe baza rezumatului de mai jos.
Toate caption-urile si hashtag-urile trebuie sa fie in limba {lang}.

Rezumat: {summary}

Cerinte obligatorii:
- Platforma: {platform}
- Stil: {config['stil']}
- Ton: {tone_desc}
- Lungime maxima per caption: {config['lungime_max']} caractere
- Numar hashtag-uri per varianta: {config['numar_hashtag']}
- Format: {config['format']}{brand_voice_line}

Returneaza DOAR un JSON valid, fara text inainte sau dupa, cu structura exacta:
{{
  "variants": [
    {{
      "caption": "textul caption-ului",
      "hashtags": ["#hashtag1", "#hashtag2"]
    }}
  ]
}}"""

    content = _chat(prompt, model)
    data = _extract_json(content)
    if data:
        extracted = data.get("variants", [])
        for variant in extracted:
            variant["hashtags"] = [
                h if h.startswith("#") else f"#{h}"
                for h in variant.get("hashtags", [])
            ]
        return extracted

    return [{"caption": content[: config["lungime_max"]], "hashtags": []}]


def generate_all_captions(
    text: str,
    platforms: list[str],
    tone: str,
    variants: int = 3,
    model: str = DEFAULT_MODEL,
    language: str = "ro",
    brand_voice: str = "",
) -> dict:
    summary = summarize_text(text, model, language)
    results = []
    for platform in platforms:
        platform_variants = generate_caption_variants(
            summary=summary,
            platform=platform,
            tone=tone,
            variants=variants,
            model=model,
            language=language,
            brand_voice=brand_voice,
        )
        results.append({"platform": platform, "variants": platform_variants})
    return {"summary": summary, "results": results}


def generate_hooks(
    text: str,
    count: int = 5,
    model: str = DEFAULT_MODEL,
    language: str = "ro",
) -> list[str]:
    lang = LANGUAGE_LABELS.get(language, "romana")
    prompt = f"""Genereaza exact {count} hook-uri captivante in limba {lang} pentru urmatorul text.
Un hook este prima propozitie dintr-un post care atrage atentia instant si face utilizatorul sa vrea sa citeasca mai mult.

Text:
{text}

Cerinte:
- Fiecare hook sa fie de maxim 2 propozitii scurte (max 120 caractere total)
- Sa fie directe, surprinzatoare sau provocatoare
- Sa evite cliseele si formulele banale de tipul "Stiai ca..."
- Sa fie in limba {lang}
- Varietate: unele pot fi intrebari, altele afirmatii bold, altele statistici

Returneaza DOAR un JSON valid, fara alte explicatii:
{{"hooks": ["hook 1", "hook 2", "hook 3"]}}"""

    content = _chat(prompt, model)
    data = _extract_json(content)
    if data:
        hooks = data.get("hooks", [])
        if hooks:
            return hooks[:count]

    # Fallback: parse line by line
    lines = [l.strip().strip("0123456789.-) ").strip() for l in content.split("\n") if l.strip()]
    return [l for l in lines if len(l) > 10][:count]


def generate_bio(
    description: str,
    platforms: list[str],
    model: str = DEFAULT_MODEL,
    language: str = "ro",
) -> list[dict]:
    lang = LANGUAGE_LABELS.get(language, "romana")
    platform_specs = "\n".join([
        f"- {p}: max {BIO_PLATFORM_CONFIG.get(p, {'max_chars': 150})['max_chars']} caractere, "
        f"{BIO_PLATFORM_CONFIG.get(p, {'note': 'concisa si relevanta'})['note']}"
        for p in platforms
    ])

    prompt = f"""Genereaza o bio pentru urmatoarele platforme sociale in limba {lang}.

Descriere / Persona:
{description}

Platforme si cerinte per platforma:
{platform_specs}

Fiecare bio trebuie sa fie adaptata specificului platformei si sa respecte limita de caractere.
Returneaza DOAR un JSON valid, fara alte explicatii:
{{"bios": [{{"platform": "LinkedIn", "bio": "..."}}, {{"platform": "TikTok", "bio": "..."}}]}}"""

    content = _chat(prompt, model)
    data = _extract_json(content)
    if data:
        bios = data.get("bios", [])
        if bios:
            return bios

    # Fallback
    return [{"platform": p, "bio": description[:BIO_PLATFORM_CONFIG.get(p, {"max_chars": 150})["max_chars"]]} for p in platforms]


def generate_thread(
    text: str,
    max_posts: int = 10,
    model: str = DEFAULT_MODEL,
    language: str = "ro",
    tone: str = "profesional",
) -> list[str]:
    lang = LANGUAGE_LABELS.get(language, "romana")
    tone_desc = TONE_CONFIG.get(tone, TONE_CONFIG["profesional"])

    prompt = f"""Transforma urmatorul text intr-un thread pentru X (Twitter) in limba {lang}.

Text:
{text}

Cerinte:
- Exact {max_posts} postari in thread (sau mai putine daca textul nu sustine mai mult)
- Fiecare postare sa aiba STRICT sub 280 de caractere (inclusiv numarul de ordine)
- Ton: {tone_desc}
- Prima postare: hook captivant care sa opreasca scrollul
- Ultimele 1-2 postari: concluzie si call-to-action
- Numeroteaza cu format: "1/" la inceput

Returneaza DOAR un JSON valid, fara alte explicatii:
{{"thread": ["1/ text postare 1", "2/ text postare 2", "3/ text postare 3"]}}"""

    content = _chat(prompt, model)
    data = _extract_json(content)
    if data:
        thread = data.get("thread", [])
        if thread:
            return thread[:max_posts]

    # Fallback: split by double newline
    parts = [p.strip() for p in content.split("\n\n") if p.strip()]
    return parts[:max_posts]
