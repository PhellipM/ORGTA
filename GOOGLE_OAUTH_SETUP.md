# 🔐 Guia de Configuração Google OAuth

Este guia mostra passo a passo como configurar a autenticação Google para o ORGTA.

## 📋 Pré-requisitos

- Conta Google
- Acesso ao [Google Cloud Console](https://console.cloud.google.com)

## 🚀 Passo a Passo

### 1. Criar Projeto no Google Cloud Console

1. Acesse [Google Cloud Console](https://console.cloud.google.com)
2. Clique em **"Selecionar um projeto"** no topo
3. Clique em **"+ NOVO PROJETO"**
4. Digite o nome: `ORGTA`
5. Clique em **"CRIAR"**

### 2. Habilitar a API Google+

1. Na barra de pesquisa, procure por **"Google+ API"**
2. Clique na primeira opção
3. Clique em **"ATIVAR"**

### 3. Configurar a Tela de Consentimento OAuth

1. No menu lateral, vá para **"APIs e serviços"** > **"Tela de consentimento OAuth"**
2. Escolha **"Externo"** como tipo de usuário
3. Clique em **"CRIAR"**
4. Preencha o formulário:
   - **Nome do app**: `ORGTA`
   - **Email de suporte do usuário**: seu-email@gmail.com
   - **Contato de desenvolvedor**: seu-email@gmail.com
5. Clique em **"SALVAR E CONTINUAR"**
6. Em "Escopos opcionais", clique em **"SALVAR E CONTINUAR"**
7. Revise as informações e clique em **"VOLTAR PARA PAINEL"**

### 4. Criar Credenciais OAuth 2.0

1. No menu lateral, vá para **"APIs e serviços"** > **"Credenciais"**
2. Clique em **"+ CRIAR CREDENCIAIS"** > **"ID do cliente OAuth"**
3. Escolha **"Aplicativo web"** como tipo
4. Preencha o formulário:
   - **Nome**: `ORGTA App`
   
5. Em **"Origens JavaScript autorizadas"**, adicione:
   ```
   http://localhost:5173
   http://localhost:3000
   ```

6. Em **"URIs de redirecionamento autorizados"**, adicione:
   ```
   http://localhost:5173/
   http://localhost:3000/api/auth/callback
   ```

7. Clique em **"CRIAR"**

### 5. Copiar Credenciais

Você verá um modal com:
- **Client ID**: `sua-id-aqui.apps.googleusercontent.com`
- **Client Secret**: `sua-secret-aqui`

Salve ambos em um local seguro.

## 🔧 Configurar Arquivos .env

### Backend (backend/.env)
```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/orgta
GOOGLE_CLIENT_ID=seu-client-id-aqui
GOOGLE_CLIENT_SECRET=seu-client-secret-aqui
JWT_SECRET=sua-chave-secreta-forte-aqui
FRONTEND_URL=http://localhost:5173
```

### Frontend (frontend/.env)
```env
VITE_API_URL=http://localhost:3000/api
VITE_SOCKET_URL=http://localhost:3000
VITE_GOOGLE_CLIENT_ID=seu-client-id-aqui
```

## ✅ Verificar Configuração

1. Inicie o backend: `npm run dev`
2. Inicie o frontend: `npm run dev`
3. Acesse `http://localhost:5173`
4. Clique em "Login com Google"
5. Selecione sua conta Google
6. Você deve ser redirecionado para a página de tarefas

## 🚨 Erros Comuns

### Erro: "invalid_client"
- Verifique se o Client ID e Secret estão corretos
- Certifique-se de que o Client ID é igual em backend e frontend

### Erro: "redirect_uri_mismatch"
- Verifique se a URL de redirecionamento está configurada corretamente
- Deve iniciarse com `http://` ou `https://` (não `localhost:`)

### Erro: "origin_mismatch"
- Adicione a origem correta nas "URIs de redirecionamento autorizadas"

## 🌍 Deploy em Produção

Quando estiver pronto para fazer deploy:

1. Atualize as URLs no Google Cloud Console:
   ```
   Origens: https://seu-dominio.com
   Redirecionamento: https://seu-dominio.com/
   ```

2. Configure os .env em produção:
   ```
   FRONTEND_URL=https://seu-dominio.com
   VITE_API_URL=https://api.seu-dominio.com/api
   ```

3. Regenere JWT_SECRET com uma chave segura

## 📚 Recursos

- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Google Cloud Console](https://console.cloud.google.com)
- [Tutorial Completo](https://developers.google.com/identity/sign-in/web/sign-in)

---

**Precisa de ajuda?** Consulte a documentação do README.md ou abra uma issue.
