# 🌐 ORGTA Online - Guia Rápido

Coloque seu ORGTA online em **menos de 15 minutos**!

## ⚡ Opção Mais Rápida: Railway + Vercel

### 1️⃣ Preparar GitHub
```bash
cd /workspaces/ORGTA
git add .
git commit -m "ORGTA project inicial"
git push origin main
```

### 2️⃣ Deploy Backend (Railway)

1. Acesse https://railway.app
2. Clique "New Project"
3. Escolha "Deploy from GitHub"
4. Selecione seu repositório ORGTA
5. Clique em "Deploy"

**Configurar Variáveis:**

Em Dashboard > Variables, adicione:
```
PORT=3000
NODE_ENV=production
MONGODB_URI=mongodb+srv://seu-usuario:senha@cluster.mongodb.net/orgta
GOOGLE_CLIENT_ID=seu-client-id-aqui
GOOGLE_CLIENT_SECRET=seu-secret-aqui
JWT_SECRET=uma-chave-super-secreta-e-muito-longa-aqui
FRONTEND_URL=https://seu-projeto.vercel.app
```

**Adicionar MongoDB Database:**
1. Railway Dashboard
2. New Service
3. Escolha MongoDB
4. Copie a conexão string

### 3️⃣ Deploy Frontend (Vercel)

1. Acesse https://vercel.com
2. Clique "Add New..."
3. Escolha "Project"
4. Importe seu repositório ORGTA
5. Configura:
   - Framework Preset: **Vite**
   - Root Directory: **frontend**
   - Build Command: **npm run build**
   - Output Directory: **dist**
6. Clique "Deploy"

**Configurar Variáveis:**

Em Settings > Environment Variables, adicione:
```
VITE_GOOGLE_CLIENT_ID=seu-client-id-aqui
VITE_API_URL=https://seu-backend.railway.app/api
VITE_SOCKET_URL=https://seu-backend.railway.app
```

### 4️⃣ Configurar Google OAuth

1. Google Cloud Console > APIs & Services
2. Credenciais > OAuth Client
3. Edite suas credenciais
4. Em "Authorized redirect URIs" adicione:
   ```
   https://seu-projeto.vercel.app/
   https://seu-backend.railway.app/api/auth/callback
   ```
5. Em "Authorized JavaScript origins" adicione:
   ```
   https://seu-projeto.vercel.app
   https://seu-backend.railway.app
   ```

### 5️⃣ Testar

1. Acesse `https://seu-projeto.vercel.app`
2. Clique em "Login com Google"
3. Selecione sua conta
4. Crie uma tarefa
5. Veja sua tarefa sendo salva em tempo real! 🎉

---

## 📋 URLs depois do Deploy

- **Frontend** (React): `https://seu-projeto.vercel.app`
- **Backend** (Express): `https://seu-backend.railway.app`
- **API**: `https://seu-backend.railway.app/api`
- **Chat**: Tempo real via WebSocket

---

## 🔐 Checklist de Deploy

```
□ Repositório criado no GitHub
□ Railway account criado
□ Vercel account criado
□ MongoDB Atlas database criado
□ Google OAuth Client ID e Secret obtidos
□ Backend deployado (Railway)
□ Frontend deployado (Vercel)
□ Variáveis de ambiente configuradas
□ Google OAuth URLs atualizadas
□ Login funcionando
□ Tarefas sincronizando
□ Chat em tempo real funcionando
```

---

## 💡 Dicas

✅ Railway oferece **$5 mensais** de crédito gratuito
✅ Vercel Frontend é **100% gratuito**
✅ MongoDB Atlas tem um **tier gratuito** com 512MB
✅ Google OAuth é **completamente grátis**

**Custo Total = Apenas Railway ($5-20/mês)**

---

## 📞 Problemas Comuns

### "Build failed"
```bash
git add .
git commit -m "Fix build"
git push
# Railway refaz automaticamente
```

### "Invalid Google OAuth"
- Verifique Client ID
- Confira URLs no Google Cloud
- Limpe cookies do navegador

### "MongoDB connection error"
- Confira string de conexão
- Verifique whitelist de IP (permita 0.0.0.0/0)
- Confirme nome do database

### "CORS error"
- Backend deve estar em produção
- Frontend deve enviar request corretamente
- Verifique VITE_ variables

---

## Referência Rápida

| Serviço | Link | Tempo Setup |
|---------|------|-----------|
| Railway | https://railway.app | 5 min |
| Vercel | https://vercel.com | 5 min |
| MongoDB | https://atlas.mongodb.com | 3 min |
| Google OAuth | Console.cloud.google.com | 2 min |

---

**Seu ORGTA estará online e funcionando em ~15 minutos!** 🚀

Para detalhes completos, leia [DEPLOY_ONLINE.md](DEPLOY_ONLINE.md)
