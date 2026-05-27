#!/usr/bin/env bash
# =============================================================================
# Script de pornire a aplicatiei Caption Generator
# Porneste backend-ul (FastAPI) si frontend-ul (Vite) in paralel.
#
# Utilizare: bash run.sh
# Prerequisit: ruleaza mai intai 'bash setup.sh'
# =============================================================================

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

ok()   { echo -e "${GREEN}[OK]${NC} $1"; }
warn() { echo -e "${YELLOW}[ATENTIE]${NC} $1"; }
err()  { echo -e "${RED}[EROARE]${NC} $1"; exit 1; }

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VENV_DIR="$PROJECT_DIR/.venv"
BACKEND_DIR="$PROJECT_DIR/backend"
UI_DIR="$PROJECT_DIR/ui"

echo ""
echo "============================================="
echo "       Pornire Caption Generator            "
echo "============================================="
echo ""

# Mediul virtual este optional — pachetele pot fi instalate global
if [ -d "$VENV_DIR" ]; then
    source "$VENV_DIR/bin/activate"
fi

# Incarca variabilele de mediu din .env daca fisierul exista
if [ -f "$PROJECT_DIR/.env" ]; then
    export $(grep -v '^#' "$PROJECT_DIR/.env" | xargs)
elif [ -f "$PROJECT_DIR/.env.example" ]; then
    export $(grep -v '^#' "$PROJECT_DIR/.env.example" | xargs)
fi

if [ -z "$GROQ_API_KEY" ]; then
    err "GROQ_API_KEY nu este setata. Adaug-o in fisierul .env din radacina proiectului."
fi

# ---- Pornire backend ----
echo ">>> Pornire backend pe http://localhost:8000 ..."
cd "$PROJECT_DIR"

# main.py isi adauga singur backend/ si nlp/ in sys.path,
# deci uvicorn poate fi apelat cu modulul complet din radacina proiectului
uvicorn backend.main:app --reload --port 8000 --log-level info &
BACKEND_PID=$!
ok "Backend pornit (PID: $BACKEND_PID)"

# Asteapta ca backend-ul sa fie gata
echo ">>> Se asteapta pornirea backend-ului..."
for i in {1..15}; do
    if curl -sf http://localhost:8000/health &>/dev/null; then
        ok "Backend disponibil."
        break
    fi
    sleep 1
done

# ---- Pornire frontend ----
echo ""
echo ">>> Pornire frontend pe http://localhost:5173 ..."
cd "$UI_DIR"

if command -v bun &>/dev/null; then
    bun run dev &
else
    npm run dev &
fi
FRONTEND_PID=$!
ok "Frontend pornit (PID: $FRONTEND_PID)"

echo ""
echo "============================================="
echo -e "${GREEN}  Aplicatia ruleaza!${NC}"
echo "  Frontend : http://localhost:5173"
echo "  Backend  : http://localhost:8000"
echo "  API docs : http://localhost:8000/docs"
echo "============================================="
echo ""
echo "Apasa Ctrl+C pentru a opri ambele servicii."
echo ""

# La Ctrl+C, opreste ambele procese
cleanup() {
    echo ""
    echo ">>> Se opresc serviciile..."
    kill "$BACKEND_PID" "$FRONTEND_PID" 2>/dev/null || true
    wait "$BACKEND_PID" "$FRONTEND_PID" 2>/dev/null || true
    echo "Servicii oprite."
}
trap cleanup INT TERM

# Asteapta pana cand utilizatorul opreste cu Ctrl+C
wait "$BACKEND_PID" "$FRONTEND_PID"
