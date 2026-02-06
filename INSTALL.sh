#!/bin/bash

echo "🚀 ORGTA - Instalação Rápida"
echo "=============================="
echo ""

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não está instalado. Instale Node.js 18+ em https://nodejs.org"
    exit 1
fi

echo "✅ Node.js $(node --version) detectado"

# Verificar MongoDB
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB não está instalado. Use MongoDB Atlas ou instale localmente"
    echo "   Acesse: https://www.mongodb.com/try/download/community"
fi

echo ""
echo "📦 Instalando Backend..."
cd backend
npm install
cp .env.example .env

echo ""
echo "📦 Instalando Frontend..."
cd ../frontend
npm install
cp .env.example .env

echo ""
echo "✅ Instalação concluída!"
echo ""
echo "📝 Próximos passos:"
echo "1. Configure suas variáveis de ambiente nos arquivos .env"
echo "2. Inicie o MongoDB em um terminal: mongod"
echo "3. Inicie o Backend em outro terminal: cd backend && npm run dev"
echo "4. Inicie o Frontend em outro terminal: cd frontend && npm run dev"
echo ""
echo "🌐 Acesse http://localhost:5173 no navegador"
echo ""
