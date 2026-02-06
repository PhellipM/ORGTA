@echo off
echo 🚀 ORGTA - Instalação Rápida (Windows)
echo ======================================
echo.

REM Verificar Node.js
where node >nul 2>nul
if errorlevel 1 (
    echo ❌ Node.js não está instalado. Instale Node.js 18+ em https://nodejs.org
    exit /b 1
)

echo ✅ Node.js detectado

REM Verificar MongoDB
where mongod >nul 2>nul
if errorlevel 1 (
    echo ⚠️  MongoDB não está instalado. Use MongoDB Atlas ou instale localmente
    echo    Acesse: https://www.mongodb.com/try/download/community
)

echo.
echo 📦 Instalando Backend...
cd backend
call npm install
copy .env.example .env

echo.
echo 📦 Instalando Frontend...
cd ..\frontend
call npm install
copy .env.example .env

echo.
echo ✅ Instalação concluída!
echo.
echo 📝 Próximos passos:
echo 1. Configure suas variáveis de ambiente nos arquivos .env
echo 2. Inicie o MongoDB em um terminal: mongod
echo 3. Inicie o Backend em outro terminal: cd backend ^&^& npm run dev
echo 4. Inicie o Frontend em outro terminal: cd frontend ^&^& npm run dev
echo.
echo 🌐 Acesse http://localhost:5173 no navegador
echo.
