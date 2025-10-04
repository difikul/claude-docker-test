# 🐳 Claude Docker Test - Full-Stack TODO App

Full-stack TODO aplikace postavená na moderním tech stacku: **Docker + PostgreSQL + Express + Vanilla JavaScript + Tailwind CSS**

[![GitHub](https://img.shields.io/badge/GitHub-difikul%2Fclaude--docker--test-blue)](https://github.com/difikul/claude-docker-test)
[![Docker](https://img.shields.io/badge/Docker-PostgreSQL%2016-blue)](https://www.docker.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8)](https://tailwindcss.com/)

---

## ✨ Features

### 🎨 Frontend
- ✅ **Moderní UI** - Tailwind CSS s gradient pozadím
- ✅ **Responzivní design** - Mobile-first approach
- ✅ **Real-time updates** - Okamžitá aktualizace UI
- ✅ **Loading states** - Spinner při načítání
- ✅ **Error handling** - User-friendly error messages
- ✅ **Animace** - Smooth transitions a slideIn efekty
- ✅ **Statistiky** - Celkem / Dokončeno / Zbývá

### 🔧 Backend
- ✅ **REST API** - 4 CRUD endpointy
- ✅ **PostgreSQL** - Databáze v Docker containeru
- ✅ **Migrations** - Automatické SQL migrations při startu
- ✅ **Validace** - Input validation na API
- ✅ **CORS** - Enabled pro cross-origin requests
- ✅ **Error handling** - Comprehensive error responses

---

## 📋 Požadavky

- Node.js 18+
- Docker & Docker Compose
- Git
- Moderní prohlížeč (Chrome, Firefox, Safari, Edge)

---

## 🚀 Rychlý start

### 1. Klonování repozitáře
```bash
git clone https://github.com/difikul/claude-docker-test.git
cd claude-docker-test
```

### 2. Instalace závislostí
```bash
npm install
```

### 3. Spuštění PostgreSQL databáze
```bash
docker compose up -d
```

> Automaticky spustí SQL migrations a vytvoří `todos` tabulku se vzorovými daty.

### 4. Spuštění Express serveru
```bash
npm run dev
```

### 5. Otevření aplikace
Otevři prohlížeč na: **http://localhost:3000**

---

## 📝 API Reference

### Base URL
```
http://localhost:3000/api/todos
```

### Endpoints

#### 📄 GET /api/todos
Získá všechny todos seřazené podle data vytvoření (nejnovější první).

**Response (200):**
```json
{
  "status": "success",
  "count": 3,
  "data": [
    {
      "id": 1,
      "title": "Naučit se Docker",
      "completed": true,
      "created_at": "2025-10-04T08:00:00.000Z"
    },
    {
      "id": 2,
      "title": "Vytvořit REST API",
      "completed": false,
      "created_at": "2025-10-04T09:00:00.000Z"
    }
  ]
}
```

**Curl příklad:**
```bash
curl http://localhost:3000/api/todos
```

---

#### ➕ POST /api/todos
Vytvoří nové todo.

**Request Body:**
```json
{
  "title": "Nový úkol"
}
```

**Response (201):**
```json
{
  "status": "success",
  "message": "Todo created successfully",
  "data": {
    "id": 3,
    "title": "Nový úkol",
    "completed": false,
    "created_at": "2025-10-04T10:00:00.000Z"
  }
}
```

**Error (400) - Prázdný title:**
```json
{
  "status": "error",
  "message": "Title is required and cannot be empty"
}
```

**Curl příklad:**
```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Naučit se PostgreSQL"}'
```

---

#### ✏️ PATCH /api/todos/:id
Přepne status `completed` (toggle).

**Response (200):**
```json
{
  "status": "success",
  "message": "Todo updated successfully",
  "data": {
    "id": 1,
    "title": "Naučit se Docker",
    "completed": false,
    "created_at": "2025-10-04T08:00:00.000Z"
  }
}
```

**Error (404) - Todo nenalezeno:**
```json
{
  "status": "error",
  "message": "Todo not found"
}
```

**Error (400) - Neplatné ID:**
```json
{
  "status": "error",
  "message": "Invalid todo ID"
}
```

**Curl příklad:**
```bash
curl -X PATCH http://localhost:3000/api/todos/1
```

---

#### ❌ DELETE /api/todos/:id
Smaže todo.

**Response (200):**
```json
{
  "status": "success",
  "message": "Todo deleted successfully",
  "data": {
    "id": 1,
    "title": "Naučit se Docker",
    "completed": true,
    "created_at": "2025-10-04T08:00:00.000Z"
  }
}
```

**Error (404) - Todo nenalezeno:**
```json
{
  "status": "error",
  "message": "Todo not found"
}
```

**Curl příklad:**
```bash
curl -X DELETE http://localhost:3000/api/todos/1
```

---

## 🎨 Frontend Usage

### Přidání TODO
1. Zadej text do inputu "Co potřebuješ udělat?"
2. Klikni na tlačítko "Přidat" nebo stiskni Enter
3. TODO se automaticky přidá do seznamu

### Označení jako dokončené
- Klikni na checkbox vedle TODO
- Text se přeškrtne a změní barvu na šedou
- Statistika "Dokončeno" se aktualizuje

### Smazání TODO
1. Najeď myší na TODO (objeví se ikona koše)
2. Klikni na ikonu koše
3. Potvrď smazání v dialogu
4. TODO zmizí ze seznamu

### Statistiky
V dolní části karty vidíš:
- **Celkem** - počet všech TODO
- **Dokončeno** - počet dokončených TODO (zelená)
- **Zbývá** - počet nedokončených TODO (modrá)

---

## 🗄️ Databáze

### Schema
```sql
CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Migrations
SQL migrations se automaticky spouštějí při prvním startu PostgreSQL:
- Volume mapping: `./migrations:/docker-entrypoint-initdb.d`
- Vytvoří tabulku `todos`
- Přidá vzorová data pro testování

### Přístup do databáze
```bash
# Připojení do PostgreSQL
docker exec -it claude-postgres psql -U claude -d claude_test

# Zobrazení všech tabulek
\dt

# Zobrazení dat z todos
SELECT * FROM todos;

# Odhlášení
\q
```

---

## 🛠 Užitečné příkazy

### Development
```bash
npm run dev          # Spustí server s nodemon (auto-reload)
npm start            # Spustí server v produkčním módu
```

### Docker
```bash
docker compose up -d           # Spustí PostgreSQL na pozadí
docker compose down            # Zastaví a odstraní kontejnery
docker compose down -v         # Zastaví a smaže i volumes (data)
docker compose logs -f postgres # Zobrazí logy PostgreSQL
docker compose ps              # Stav kontejnerů
docker ps                      # Běžící kontejnery
```

### Database
```bash
# Spuštění psql v kontejneru
docker exec -it claude-postgres psql -U claude -d claude_test

# Export dat
docker exec claude-postgres pg_dump -U claude claude_test > backup.sql

# Import dat
docker exec -i claude-postgres psql -U claude -d claude_test < backup.sql
```

---

## 📂 Struktura projektu

```
claude-docker-test/
│
├── migrations/                 # SQL migrations
│   └── 001_create_todos.sql   # Vytvoření todos tabulky
│
├── public/                     # Frontend statické soubory
│   ├── index.html              # HTML (Tailwind CSS)
│   └── app.js                  # JavaScript (Vanilla JS)
│
├── Claude.MD                   # Podrobná tech dokumentace
├── README.md                   # Tento soubor
├── docker-compose.yml          # PostgreSQL konfigurace
├── package.json                # Node.js dependencies
├── server.js                   # Express REST API
├── .env.example                # Příklad env variables
└── .gitignore                 # Git ignore
```

---

## 🐛 Troubleshooting

### PostgreSQL se nespustí
```bash
# Zkontroluj logy
docker compose logs postgres

# Restartuj kontejner
docker compose restart postgres

# Smaž volumes a začni znovu
docker compose down -v
docker compose up -d
```

### Frontend neukazuje data
1. Zkontroluj že server běží: `curl http://localhost:3000/api/todos`
2. Otevři Developer Tools (F12) a zkontroluj Console
3. Zkontroluj Network tab pro API requesty
4. Ověř že PostgreSQL běží: `docker ps | grep postgres`

### Migrations se nespustily
```bash
# Zkontroluj že tabulka existuje
docker exec -it claude-postgres psql -U claude -d claude_test -c "\dt"

# Pokud neexistuje, restartuj s volumes reset
docker compose down -v
docker compose up -d
```

### Port 3000 nebo 5432 je obsazený
```bash
# Najdi proces na portu
sudo lsof -i :3000
sudo lsof -i :5432

# Změň port v .env nebo docker-compose.yml
```

### CORS errors v browseru
- Server má CORS enabled automaticky
- Zkontroluj že používáš správný port (3000)
- Refresh browser cache (Ctrl+F5)

---

## 🔒 Security

### Implementované features
- ✅ Input validace (title required, not empty)
- ✅ ID validace (musí být číslo)
- ✅ SQL injection protection (parameterized queries)
- ✅ CORS enabled
- ✅ Error handling bez leak sensitive info

### Pro produkci
- Změň PostgreSQL heslo v `docker-compose.yml`
- Nastav silné heslo v `.env`
- Použij environment variables pro secrets
- Přidej rate limiting
- Implementuj autentizaci (JWT)

---

## 🚀 Production Deployment

### Environment Variables
Vytvoř `.env` soubor:
```bash
PORT=3000
POSTGRES_USER=claude
POSTGRES_PASSWORD=strong_password_here
POSTGRES_DB=claude_test
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
```

### Docker Production
```bash
# Build & run
docker compose up -d

# Zkontroluj že běží
docker compose ps

# Zkontroluj logy
docker compose logs -f
```

---

## 🧪 Testování

### Manual Testing
```bash
# 1. GET - Všechny todos
curl http://localhost:3000/api/todos

# 2. POST - Vytvoř nové todo
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Test úkol"}'

# 3. PATCH - Toggle completed (id=1)
curl -X PATCH http://localhost:3000/api/todos/1

# 4. DELETE - Smaž todo (id=1)
curl -X DELETE http://localhost:3000/api/todos/1
```

### Browser Testing
1. Otevři http://localhost:3000
2. Přidej několik TODO položek
3. Označuj jako dokončené (checkbox)
4. Mazej položky (delete ikona)
5. Zkontroluj statistiky

---

## 🤝 Přispívání

1. Fork repozitáře
2. Vytvoř feature branch (`git checkout -b feature/amazing-feature`)
3. Commit změny (`git commit -m 'feat: Add amazing feature'`)
4. Push do branch (`git push origin feature/amazing-feature`)
5. Otevři Pull Request

---

## 📈 Budoucí vylepšení

- [ ] 🔐 Autentizace (JWT)
- [ ] 👥 Multi-user support
- [ ] 🏷️ Categories/tags
- [ ] 📅 Due dates
- [ ] ⭐ Priority levels
- [ ] 🔍 Search & filter
- [ ] 🌙 Dark mode
- [ ] 📱 PWA (offline support)
- [ ] 🧪 Unit & integration tests
- [ ] 🚀 CI/CD pipeline

---

## 📝 Licence

MIT

---

## 👤 Autor

**Lukáš Scorvan**
- GitHub: [@difikul](https://github.com/difikul)
- Email: lscorvan@gmail.com

---

## 🙏 Poděkování

- **Claude Code** - AI asistent pro vývoj
- **Anthropic** - Za Claude AI
- **Tailwind CSS** - Za skvělý CSS framework
- **PostgreSQL** - Za spolehlivou databázi

---

**🤖 Vytvořeno s pomocí [Claude Code](https://claude.com/claude-code)**
