# ORGTA - Estrutura de Arquivos

```
ORGTA/
│
├── 📁 backend/
│   ├── 📁 src/
│   │   ├── 📁 controllers/
│   │   │   ├── authController.js          # Lógica de autenticação Google
│   │   │   ├── taskController.js          # CRUD de tarefas
│   │   │   ├── userController.js          # Gerenciamento de usuários
│   │   │   └── chatController.js          # Gerenciamento de chat
│   │   │
│   │   ├── 📁 models/
│   │   │   ├── User.js                    # Schema de usuários MongoDB
│   │   │   ├── Task.js                    # Schema de tarefas MongoDB
│   │   │   └── ChatMessage.js             # Schema de mensagens MongoDB
│   │   │
│   │   ├── 📁 routes/
│   │   │   ├── authRoutes.js              # Rotas /api/auth
│   │   │   ├── taskRoutes.js              # Rotas /api/tasks
│   │   │   ├── userRoutes.js              # Rotas /api/users
│   │   │   └── chatRoutes.js              # Rotas /api/chat
│   │   │
│   │   ├── 📁 middleware/
│   │   │   └── auth.js                    # Middleware de autenticação JWT
│   │   │
│   │   └── server.js                      # Servidor Express + Socket.IO
│   │
│   ├── package.json                       # Dependências do backend
│   ├── .env.example                       # Exemplo de variáveis de ambiente
│   ├── .gitignore                         # Configuração Git
│   └── Dockerfile                         # Imagem Docker
│
├── 📁 frontend/
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   ├── Header.jsx                 # Navegação + tema + perfil
│   │   │   ├── TaskCard.jsx               # Card individual de tarefa
│   │   │   └── TaskForm.jsx               # Modal de criar/editar tarefa
│   │   │
│   │   ├── 📁 pages/
│   │   │   ├── Login.jsx                  # Página de login Google
│   │   │   ├── Tasks.jsx                  # Lista de tarefas + filtros
│   │   │   ├── Chat.jsx                   # Chat em tempo real
│   │   │   └── TaskHistory.jsx            # Histórico (concluídas/canceladas)
│   │   │
│   │   ├── 📁 services/
│   │   │   ├── api.js                     # Cliente Axios com interceptadores
│   │   │   └── socket.js                  # Gerenciador de Socket.IO
│   │   │
│   │   ├── 📁 hooks/
│   │   │   ├── useTasks.js                # Hook para operações de tarefas
│   │   │   ├── useSocket.js               # Hook para Socket.IO
│   │   │   └── useUsers.js                # Hook para gerenciar usuários
│   │   │
│   │   ├── 📁 context/
│   │   │   └── AuthContext.jsx            # Context de autenticação global
│   │   │
│   │   ├── 📁 styles/
│   │   │   └── global.css                 # Estilos globais + Tailwind
│   │   │
│   │   ├── App.jsx                        # Componente raiz com rotas
│   │   └── main.jsx                       # Entry point React
│   │
│   ├── index.html                         # Template HTML
│   ├── vite.config.js                     # Config Vite (build + dev server)
│   ├── tailwind.config.js                 # Config Tailwind CSS
│   ├── postcss.config.js                  # Config PostCSS para Tailwind
│   ├── package.json                       # Dependências do frontend
│   ├── .env.example                       # Exemplo de variáveis
│   ├── .gitignore                         # Configuração Git
│   └── Dockerfile                         # Imagem Docker
│
├── 📄 docker-compose.yml                  # Orquestração de containers
├── 🚀 INSTALL.sh                          # Script de instalação (Linux/Mac)
├── 🚀 INSTALL.bat                         # Script de instalação (Windows)
├── 📄 .prettierrc                         # Config de formatação de código
├── 📄 .prettierignore                     # Arquivos ignorados pelo Prettier
├── 📋 README.md                           # Documentação completa
└── 📊 PROJECT_STATUS.md                   # Status do projeto
```

## 📊 Resumo de Arquivos

### Backend (17 arquivos)
- **Controllers**: 4 arquivos
- **Models**: 3 arquivos
- **Routes**: 4 arquivos
- **Middleware**: 1 arquivo
- **Config**: 4 arquivos (package.json, .env.example, .gitignore, Dockerfile)

### Frontend (23 arquivos)
- **Components**: 3 arquivos
- **Pages**: 4 arquivos
- **Services**: 2 arquivos
- **Hooks**: 3 arquivos
- **Context**: 1 arquivo
- **Styles**: 1 arquivo
- **Config**: 9 arquivos (vite, tailwind, postcss, package.json, etc.)
- **Entry points**: 2 arquivos (App.jsx, main.jsx)

### Root (8 arquivos)
- Docker Compose
- Scripts de instalação
- Documentação

## 🔧 Configurações

### Backend Endpoints
```
GET    /api/auth/profile
POST   /api/auth/google
POST   /api/auth/logout

GET    /api/tasks
POST   /api/tasks
GET    /api/tasks/:id
PUT    /api/tasks/:id
DELETE /api/tasks/:id
PATCH  /api/tasks/:id/complete
GET    /api/tasks/history

GET    /api/users
GET    /api/users/online
GET    /api/users/:id
PUT    /api/users/:id

GET    /api/chat
DELETE /api/chat/:id
```

### Frontend Routes
```
/login                # Página de login
/tasks                # Lista de tarefas
/chat                 # Bate-papo ao vivo
/history              # Histórico de tarefas
/                     # Redireciona para /tasks ou /login
```

### Socket Events
```
user_online           # Usuário conectou
user_left             # Usuário desconectou
online_users          # Lista de usuários online
send_message          # Enviar mensagem
receive_message       # Receber mensagem
task_created          # Tarefa criada
task_updated          # Tarefa atualizada
task_completed        # Tarefa concluída
task_deleted          # Tarefa deletada
```

## 📦 Dependências Principais

### Backend
- express@4.18.2 - Framework web
- mongoose@7.0.0 - ODM para MongoDB
- socket.io@4.5.4 - WebSockets real-time
- google-auth-library@9.2.0 - Autenticação Google
- jsonwebtoken@9.0.0 - JWT
- cors@2.8.5 - CORS habilitado

### Frontend
- react@18.2.0 - UI Framework
- react-router-dom@6.10.0 - Roteamento
- socket.io-client@4.5.4 - WebSockets client
- axios@1.3.4 - HTTP Client
- tailwindcss@3.2.7 - CSS Framework
- @react-oauth/google - Google OAuth
- lucide-react@0.263.1 - Ícones SVG
- vite@4.1.0 - Build tool

---

**Estrutura criada: 48 arquivos | 2 diretórios principais | 2 Docker images | Full-stack moderno**
