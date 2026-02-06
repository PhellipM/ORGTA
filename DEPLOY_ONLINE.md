# 🌐 Guia de Deploy Online - ORGTA

Este guia mostra como colocar o ORGTA online em diferentes plataformas.

## 🚀 Opções de Deploy

### **Opção 1: Railway (RECOMENDADO - Mais Fácil)**

#### Passo 1: Sign up
1. Acesse [Railway.app](https://railway.app)
2. Faça login com GitHub
3. Crie um novo projeto

#### Passo 2: Conectar Repositório
1. Clique em "New Project"
2. Escolha "Deploy from GitHub repo"
3. Selecione seu repositório ORGTA
4. Autorize o acesso

#### Passo 3: Configurar Backend
1. Railway criará automaticamente um serviço
2. Vá em "Variables"
3. Adicione as variáveis de ambiente:

```env
PORT=3000
NODE_ENV=production
MONGODB_URI=mongodb+srv://seu-usuario:sua-senha@cluster.mongodb.net/orgta
GOOGLE_CLIENT_ID=seu-client-id
GOOGLE_CLIENT_SECRET=seu-client-secret
JWT_SECRET=sua-chave-secreta-forte-super-segura
FRONTEND_URL=https://seu-dominio.vercel.app
```

#### Passo 4: Configurar MongoDB
1. Railway > New
2. Escolha "MongoDB"
3. Aguarde inicializar
4. Copie a conexão string
5. Adicione em `MONGODB_URI` do backend

#### Passo 5: Configurar Frontend no Vercel
1. Acesse [Vercel.com](https://vercel.com)
2. Faça login com GitHub
3. Importe o repositório
4. Configure:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. Adicione variáveis de ambiente:
```env
VITE_GOOGLE_CLIENT_ID=seu-client-id
VITE_API_URL=https://seu-backend-railway.up.railway.app/api
VITE_SOCKET_URL=https://seu-backend-railway.up.railway.app
```

#### Pronto! ✅
- Frontend: `https://seu-projeto.vercel.app`
- Backend: `https://seu-backend-railway.up.railway.app`

---

### **Opção 2: Heroku (Versão Gratuita Descontinuada)**

Se quiser usar alternativas ao Heroku:

#### Backend Alternativas:
- Railway.app
- Render.com
- Fly.io
- Replit

#### Frontend Alternativas:
- Vercel (recomendado)
- Netlify
- GitHub Pages
- Firebase Hosting

---

### **Opção 3: Render.com (Alternativa ao Heroku)**

#### Passo 1: Deploy Backend
1. Acesse [Render.com](https://render.com)
2. Clique "New +" > "Web Service"
3. Conecte seu GitHub
4. Escolha o repositório ORGTA

#### Passo 2: Configurar
```
Name: orgta-backend
Root Directory: backend
Runtime: node
Build Command: npm install
Start Command: npm start
Environment: Production
```

#### Passo 3: Adicionar Variáveis
Em "Environment" adicione:
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
JWT_SECRET=...
FRONTEND_URL=https://seu-frontend.vercel.app
```

#### Passo 4: Deploy Frontend
Mesmo processo no Vercel (mais abaixo)

---

### **Opção 4: Firebase Hosting**

#### Passo 1: Instalar Firebase CLI
```bash
npm install -g firebase-tools
firebase login
```

#### Passo 2: Inicializar
```bash
cd frontend
firebase init
```

Escolha:
- [x] Hosting
- [x] Realtime Database
- [x] Cloud Functions

#### Passo 3: Build
```bash
npm run build
```

#### Passo 4: Deploy
```bash
firebase deploy
```

---

## 🌍 Configurar Google OAuth para Produção

### No Google Cloud Console:

1. Vá em "APIs and Services" > "Credentials"
2. Clique no seu projeto OAuth
3. Em "Authorized redirect URIs" adicione:
   ```
   https://seu-dominio.vercel.app/
   https://seu-dominio.vercel.app/login
   https://seu-backend.railway.app/api/auth/callback
   ```

4. Em "Authorized JavaScript origins" adicione:
   ```
   https://seu-dominio.vercel.app
   https://seu-backend.railway.app
   ```

---

## 🛢️ MongoDB Atlas (Banco de Dados Online)

### Passo 1: Criar Cluster
1. Acesse [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crie uma conta
3. Crie um novo cluster (escolha tier gratuito)

### Passo 2: Criar String de Conexão
1. Vá em "Connect"
2. Escolha "Connect your application"
3. Copie a string: `mongodb+srv://...`

### Passo 3: Adicionar IP Whitelist
1. Na guia "Network Access"
2. Adicione seu IP (ou `0.0.0.0/0` para permitir todos)

### Passo 4: Usar em Produção
Adicione em `MONGODB_URI`:
```
mongodb+srv://seu-usuario:sua-senha@cluster0.xxxxx.mongodb.net/orgta?retryWrites=true&w=majority
```

---

## 📚 Variáveis de Ambiente por Plataforma

### Railway
```env
PORT=3000
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
JWT_SECRET=chave-muito-secreta-e-segura-aqui
FRONTEND_URL=https://seu-frontend.vercel.app
```

### Vercel (Frontend)
```env
VITE_GOOGLE_CLIENT_ID=...
VITE_API_URL=https://seu-backend.railway.app/api
VITE_SOCKET_URL=https://seu-backend.railway.app
```

---

## ✅ Checklist de Deploy

- [ ] Repositório no GitHub (público ou privado)
- [ ] Google Cloud OAuth configurado
- [ ] MongoDB Atlas cluster criado
- [ ] Railway account criado
- [ ] Vercel account criado
- [ ] Backend deployado (Railway)
- [ ] Frontend deployado (Vercel)
- [ ] Variáveis de ambiente configuradas
- [ ] Google OAuth URLs atualizadas
- [ ] Banco de dados conectado
- [ ] Teste login funcionando
- [ ] Chat funcionando
- [ ] Tarefas sendo salvas

---

## 🚨 Troubleshooting de Deploy

### ❌ Erro: "MONGODB_URI is required"
**Solução**: Adicione a variável em Settings/Environment do Railway/Render

### ❌ Erro: "Invalid Google Client ID"
**Solução**: Verifique se as URLs estão autorizadas no Google Cloud

### ❌ Erro: "CORS blocked"
**Solução**: Verifique backend/src/server.js CORS origin

### ❌ Erro: "Socket.IO connection failed"
**Solução**: Use a mesma URL para API e Socket:
```env
VITE_API_URL=https://seu-backend.railway.app/api
VITE_SOCKET_URL=https://seu-backend.railway.app
```

### ❌ Erro: "Build failed"
**Solução**: 
```bash
# Localmente
npm install
npm run build
git add .
git commit -m "Fix build"
git push
```

---

## 📊 Comparação de Plataformas

| Plataforma | Backend | Frontend | Custo | Facilidade |
|-----------|---------|----------|-------|-----------|
| **Railway + Vercel** | $5-20/mês | Grátis | Baixo | ⭐⭐⭐⭐⭐ |
| **Render + Vercel** | Grátis* | Grátis | Grátis* | ⭐⭐⭐⭐ |
| **Firebase** | $1-25/mês | Grátis | Baixo | ⭐⭐⭐ |
| **AWS** | $10+/mês | Grátis | Médio | ⭐⭐ |
| **Heroku** | ❌ Descontinuado | - | - | - |

*Render: Grátis com spin-down de 15 min inatividade

---

## 🎯 Fluxo de Deploy Recomendado

```
1. Git Push ao GitHub
    ↓
2. Vercel detecta mudanças no /frontend
    ↓
3. Vercel faz build e deploy do React
    ↓
4. Railway detecta mudanças no /backend
    ↓
5. Railway faz build e deploy do Node.js
    ↓
6. Seu app está online! 🎉
```

---

## 🔒 Segurança em Produção

✅ Use variáveis de ambiente para tudo sensível
✅ Ative HTTPS (automático em Railway, Vercel)
✅ Use JWT_SECRET forte (mínimo 32 caracteres)
✅ Whitelist IPs no MongoDB Atlas
✅ Monitore logs regularmente
✅ Faça backup do MongoDB
✅ Use rate limiting no backend

---

## 📞 Suporte

- Railway docs: https://docs.railway.app
- Vercel docs: https://vercel.com/docs
- MongoDB Atlas: https://docs.atlas.mongodb.com
- Google OAuth: https://developers.google.com/identity

---

**Seu ORGTA agora está online e acessível ao mundo! 🌍**
