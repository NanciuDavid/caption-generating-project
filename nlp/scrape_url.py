import trafilatura


def scrape_url(url: str) -> dict:
    # Descarca si extrage textul principal dintr-o pagina web folosind trafilatura.
    # Trafilatura ignora meniuri, reclame si elemente de navigare — extrage doar continutul editorial.
    try:
        downloaded = trafilatura.fetch_url(url)
        if not downloaded:
            return {"status": "error", "error": "Nu am putut accesa URL-ul. Verifica daca adresa este corecta si accesibila."}

        text = trafilatura.extract(downloaded, include_comments=False, include_tables=False)
        if not text or len(text.strip()) < 50:
            return {"status": "error", "error": "Nu am putut extrage text suficient din pagina. Incearca cu alt URL."}

        return {"status": "success", "text": text.strip()}
    except Exception as e:
        return {"status": "error", "error": f"Eroare la accesarea paginii: {str(e)}"}
