#!/usr/bin/env bash
# =============================================================================
# Script de instalare a dependintelor proiectului Caption Generator
# Ruleaza o singura data inainte de prima pornire a aplicatiei.
#
# Utilizare: bash setup.sh
# =============================================================================

set -e  # Opreste executia la prima eroare

# ---- Culori pentru output ----
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

ok()   { echo -e "${GREEN}[OK]${NC} $1"; }
warn() { echo -e "${YELLOW}[ATENTIE]${NC} $1"; }
err()  { echo -e "${RED}[EROARE]${NC} $1"; exit 1; }

echo ""
echo "============================================="
echo "   Instalare dependinte Caption Generator   "
echo "============================================="
echo ""

# Directorul radacina al proiectului (locatia scriptului)
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$PROJECT_DIR/backend"
UI_DIR="$PROJECT_DIR/ui"
VENV_DIR="$PROJECT_DIR/.venv"

# -----------------------------------------------------------------------------
# 1. Verificare Python 3.10+
# -----------------------------------------------------------------------------
echo ">>> Verificare Python..."
if ! command -v python3 &>/dev/null; then
    err "Python 3 nu este instalat. Descarca de la https://python.org"
fi

PYTHON_VERSION=$(python3 -c "import sys; print(f'{sys.version_info.major}.{sys.version_info.minor}')")
PYTHON_MAJOR=$(echo "$PYTHON_VERSION" | cut -d. -f1)
PYTHON_MINOR=$(echo "$PYTHON_VERSION" | cut -d. -f2)

if [ "$PYTHON_MAJOR" -lt 3 ] || { [ "$PYTHON_MAJOR" -eq 3 ] && [ "$PYTHON_MINOR" -lt 10 ]; }; then
    err "Ai Python $PYTHON_VERSION. Proiectul necesita Python 3.10+."
fi
ok "Python $PYTHON_VERSION detectat."

# -----------------------------------------------------------------------------
# 2. Creare mediu virtual Python
# -----------------------------------------------------------------------------
echo ""
echo ">>> Creare mediu virtual Python (.venv)..."
if [ -d "$VENV_DIR" ]; then
    warn "Mediul virtual exista deja. Se sare crearea."
else
    python3 -m venv "$VENV_DIR"
    ok "Mediu virtual creat la $VENV_DIR"
fi

# Activeaza mediul virtual
source "$VENV_DIR/bin/activate"
ok "Mediu virtual activat."

# -----------------------------------------------------------------------------
# 3. Instalare dependinte Python (backend + NLP)
# -----------------------------------------------------------------------------
echo ""
echo ">>> Instalare dependinte Python din backend/requirements.txt..."
pip install --upgrade pip --quiet
pip install -r "$BACKEND_DIR/requirements.txt"
ok "Dependinte Python instalate."

# -----------------------------------------------------------------------------
# 4. Verificare Node.js
# -----------------------------------------------------------------------------
echo ""
echo ">>> Verificare Node.js..."
if ! command -v node &>/dev/null; then
    err "Node.js nu este instalat. Descarca de la https://nodejs.org"
fi
NODE_VERSION=$(node --version)
ok "Node.js $NODE_VERSION detectat."

# -----------------------------------------------------------------------------
# 5. Instalare dependinte frontend
# -----------------------------------------------------------------------------
echo ""
echo ">>> Instalare dependinte frontend (ui/)..."
cd "$UI_DIR"

# Foloseste bun daca este disponibil, altfel npm
if command -v bun &>/dev/null; then
    bun install
    ok "Dependinte frontend instalate cu bun."
else
    npm install
    ok "Dependinte frontend instalate cu npm."
fi

cd "$PROJECT_DIR"

# -----------------------------------------------------------------------------
# 6. Verificare Ollama
# -----------------------------------------------------------------------------
echo ""
echo ">>> Verificare Ollama..."
if ! command -v ollama &>/dev/null; then
    warn "Ollama nu este instalat."
    warn "Instaleaza de la https://ollama.com si ruleaza 'ollama serve' inainte de a porni backend-ul."
else
    ok "Ollama detectat."

    # Verifica daca serverul Ollama ruleaza
    if curl -sf http://localhost:11434/api/tags &>/dev/null; then
        echo ">>> Se descarca modelul llama3.2 (necesita ~2 GB)..."
        ollama pull llama3.2
        ok "Modelul llama3.2 descarcat."
    else
        warn "Serverul Ollama nu ruleaza. Porneste-l cu 'ollama serve', apoi ruleaza: ollama pull llama3.2"
    fi
fi

# -----------------------------------------------------------------------------
# Finalizare
# -----------------------------------------------------------------------------
echo ""
echo "============================================="
echo -e "${GREEN}   Instalare finalizata cu succes!${NC}"
echo "============================================="
echo ""
echo "Porneste aplicatia cu:  bash run.sh"
echo "Sau manual:"
echo "  Backend : source .venv/bin/activate && uvicorn backend.main:app --reload --port 8000"
echo "  Frontend: cd ui && npm run dev"
echo ""
