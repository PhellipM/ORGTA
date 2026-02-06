#!/usr/bin/env bash

# ORGTA - Quick Start Guide
# Script de configuração rápida do ORGTA

set -e

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║  🚀 ORGTA - Organizador de Tarefas Interno - Setup Rápido    ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check Node.js
echo -e "${BLUE}✓${NC} Verificando requisitos..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js não encontrado${NC}"
    echo "  Instale em: https://nodejs.org (v18+)"
    exit 1
fi
echo -e "${GREEN}  Node.js $(node --version)${NC}"

# Check npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}✗ npm não encontrado${NC}"
    exit 1
fi
echo -e "${GREEN}  npm $(npm --version)${NC}"

# Install Backend
echo ""
echo -e "${BLUE}📦 Instalando backend...${NC}"
cd backend
npm install > /dev/null 2>&1 || npm install
[ ! -f .env ] && cp .env.example .env
echo -e "${GREEN}  ✓ Backend instalado${NC}"
cd ..

# Install Frontend
echo -e "${BLUE}📦 Instalando frontend...${NC}"
cd frontend
npm install > /dev/null 2>&1 || npm install
[ ! -f .env ] && cp .env.example .env
echo -e "${GREEN}  ✓ Frontend instalado${NC}"
cd ..

# MongoDB Check
echo ""
echo -e "${BLUE}✓ Verificando MongoDB...${NC}"
if command -v mongod &> /dev/null; then
    echo -e "${GREEN}  ✓ MongoDB instalado${NC}"
else
    echo -e "${YELLOW}  ⚠ MongoDB não encontrado${NC}"
    echo "  Opções:"
    echo "  1. Instalar: https://www.mongodb.com/try/download/community"
    echo "  2. Usar MongoDB Atlas: https://www.mongodb.com/cloud/atlas"
    echo ""
fi

# Configuration
echo ""
echo -e "${BLUE}⚙️  Próximas etapas:${NC}"
echo ""
echo "1️⃣  Configurar Google OAuth:"
echo "   - Abra o arquivo: GOOGLE_OAUTH_SETUP.md"
echo "   - Siga o guia passo a passo"
echo "   - Copie Client ID e Secret para os .env"
echo ""
echo "2️⃣  Configurar variáveis de ambiente:"
echo "   - backend/.env"
echo "   - frontend/.env"
echo ""
echo "3️⃣  Iniciar os serviços (em 3 terminais diferentes):"
echo ""
echo "   Terminal 1 - MongoDB:"
echo -e "   ${YELLOW}mongod${NC}"
echo ""
echo "   Terminal 2 - Backend:"
echo -e "   ${YELLOW}cd backend && npm run dev${NC}"
echo ""
echo "   Terminal 3 - Frontend:"
echo -e "   ${YELLOW}cd frontend && npm run dev${NC}"
echo ""
echo "4️⃣  Acessar a aplicação:"
echo -e "   ${BLUE}http://localhost:5173${NC}"
echo ""
echo -e "${GREEN}✓ Instalação concluída com sucesso!${NC}"
echo ""
echo "📚 Documentação:"
echo "  - README.md - Documentação completa"
echo "  - STRUCTURE.md - Estrutura do projeto"
echo "  - GOOGLE_OAUTH_SETUP.md - Configuração Google OAuth"
echo "  - PROJECT_STATUS.md - Status de funcionalidades"
echo ""
echo "💡 Dicas:"
echo "  - Use 'npm run dev' para modo desenvolvimento"
echo "  - Use 'docker-compose up' para rodar com Docker"
echo "  - Temas escuro/claro disponíveis (ícone no header)"
echo ""
