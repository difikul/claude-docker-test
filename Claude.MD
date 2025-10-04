# Claude Docker Test Project - Full-Stack TODO App

## 📋 Popis projektu
Full-stack TODO aplikace demonstrující kompletní moderní web stack: Docker (PostgreSQL) + Node.js/Express REST API + Vanilla JavaScript frontend s Tailwind CSS.

## 🛠 Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Databáze:** PostgreSQL 16 (Docker)
- **Containerizace:** Docker & Docker Compose
- **Dev Tools:** nodemon
- **Middleware:** CORS, express.json, express.static

### Frontend
- **JavaScript:** Vanilla JS (Fetch API)
- **CSS:** Tailwind CSS (CDN)
- **Design:** Responsive, mobile-first
- **UX:** Loading states, error handling, real-time updates

### Database
- **Migrations:** Automatické SQL migrations při startu
- **Schema:** todos table (id, title, completed, created_at)

## 🏗 Architektura

```
┌─────────────────────────────────────┐
│         Browser (Frontend)          │
│    - HTML + Tailwind CSS            │
│    - Vanilla JavaScript             │
│    - Fetch API                      │
└──────────────┬──────────────────────┘
               │ HTTP/REST
               ▼
┌─────────────────────────────────────┐
│        Express REST API             │
│    (server.js - localhost:3000)     │
│                                     │
│  Endpoints:                         │
│  • GET    /api/todos                │
│  • POST   /api/todos                │
│  • PATCH  /api/todos/:id            │
│  • DELETE /api/todos/:id            │
└──────────────┬──────────────────────┘
               │ pg (PostgreSQL client)
               ▼
┌─────────────────────────────────────┐
│       PostgreSQL 16 Database        │
│    (Docker container - port 5432)   │
│                                     │
│  Tables:                            │
│  • todos (id, title, completed,     │
│           created_at)               │
└─────────────────────────────────────┘
```

## 🚀 Jak spustit

### 1. Nainstalovat závislosti
```bash
npm install
```

### 2. Spustit PostgreSQL (Docker)
```bash
docker compose up -d
```
Automaticky spustí SQL migrations z `migrations/` složky.

### 3. Spustit Express server
```bash
npm run dev
```

### 4. Otevřít aplikaci
Otevři prohlížeč na: **http://localhost:3000**

## 📝 API Dokumentace

### GET /api/todos
Vrátí všechny todos seřazené podle `created_at DESC`.

**Response:**
```json
{
  "status": "success",
  "count": 3,
  "data": [
    {
      "id": 1,
      "title": "Vytvořit REST API",
      "completed": true,
      "created_at": "2025-10-04T10:00:00.000Z"
    }
  ]
}
```

### POST /api/todos
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
    "id": 4,
    "title": "Nový úkol",
    "completed": false,
    "created_at": "2025-10-04T10:30:00.000Z"
  }
}
```

**Validace:**
- `title` je povinný
- `title` nesmí být prázdný string

### PATCH /api/todos/:id
Přepne `completed` status (toggle).

**Response:**
```json
{
  "status": "success",
  "message": "Todo updated successfully",
  "data": {
    "id": 1,
    "title": "Vytvořit REST API",
    "completed": false,
    "created_at": "2025-10-04T10:00:00.000Z"
  }
}
```

**Error (404):**
```json
{
  "status": "error",
  "message": "Todo not found"
}
```

### DELETE /api/todos/:id
Smaže todo.

**Response:**
```json
{
  "status": "success",
  "message": "Todo deleted successfully",
  "data": {
    "id": 1,
    "title": "Vytvořit REST API",
    "completed": true,
    "created_at": "2025-10-04T10:00:00.000Z"
  }
}
```

## 🎨 Frontend Features

### UI Komponenty
- ✅ Responzivní design (mobile-first)
- ✅ Moderní gradient pozadí
- ✅ Formulář pro přidání TODO
- ✅ Seznam TODO items s animacemi
- ✅ Checkbox pro toggle completed
- ✅ Delete tlačítko (hover efekt)
- ✅ Empty state (když nejsou todos)
- ✅ Loading state (spinner)
- ✅ Error state (s auto-hide)
- ✅ Statistiky (celkem/dokončeno/zbývá)

### UX Features
- Real-time UI update po každé akci
- Loading spinner při načítání
- Error messages s auto-hide (5s)
- Confirm dialog při mazání
- Přeškrtnutý text u completed items
- Smooth animace při přidávání items

## 💾 Databáze

### Migrations
SQL migrations se spouštějí automaticky při prvním startu PostgreSQL díky volume mappingu:
```yaml
volumes:
  - ./migrations:/docker-entrypoint-initdb.d
```

### Schema
```sql
CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 📂 Struktura projektu

```
claude-docker-test/
├── migrations/
│   └── 001_create_todos.sql    # SQL migrations
├── public/
│   ├── index.html               # Frontend HTML (Tailwind CSS)
│   └── app.js                   # Frontend JavaScript (Vanilla)
├── Claude.MD                    # Tato dokumentace
├── docker-compose.yml           # PostgreSQL služba
├── package.json                 # Node.js závislosti
├── server.js                    # Express REST API
├── .env.example                 # Příklad env vars
├── .gitignore                  # Git ignore
└── README.md                   # Uživatelská dokumentace
```

## 🧪 Testování

### API Test příklady
```bash
# Get all todos
curl http://localhost:3000/api/todos

# Create new todo
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Test úkol"}'

# Toggle completed (id=1)
curl -X PATCH http://localhost:3000/api/todos/1

# Delete todo (id=1)
curl -X DELETE http://localhost:3000/api/todos/1
```

### Browser Test
1. Otevři http://localhost:3000
2. Přidej nový TODO
3. Klikni na checkbox (toggle completed)
4. Klikni na delete ikonu (smazání)
5. Zkontroluj statistiky

## 🛠 Příkazy

| Příkaz | Popis |
|--------|-------|
| `npm run dev` | Spustí dev server s nodemon (auto-reload) |
| `npm start` | Spustí server v produkčním módu |
| `docker compose up -d` | Spustí PostgreSQL na pozadí |
| `docker compose down` | Zastaví a odstraní kontejnery |
| `docker compose logs -f postgres` | Zobrazí logy PostgreSQL |
| `docker ps` | Zobrazí běžící kontejnery |

## 🐛 Troubleshooting

### PostgreSQL se nespustí
```bash
# Zkontroluj logy
docker compose logs postgres

# Restartuj kontejner
docker compose restart postgres
```

### Frontend neukazuje data
```bash
# Zkontroluj zda server běží
curl http://localhost:3000/api/todos

# Zkontroluj browser console (F12)
# Hledej network errors nebo CORS issues
```

### Migrations se nespustily
```bash
# Smaž volume a restartuj
docker compose down -v
docker compose up -d

# Zkontroluj že tabulka existuje
docker exec -it claude-postgres psql -U claude -d claude_test -c "\dt"
```

### Port 3000 nebo 5432 je obsazený
```bash
# Najdi proces na portu
sudo lsof -i :3000
sudo lsof -i :5432

# Změň port v .env nebo docker-compose.yml
```

## 📊 Screenshoty

### Desktop View
- Moderní gradient pozadí (blue-indigo)
- Centrovaný layout (max-width: 2xl)
- Velká karta se shadow
- Plná funkcionalita TODO managementu

### Mobile View
- Responzivní design
- Stack layout
- Touch-friendly tlačítka
- Optimalizovaná velikost textů

## 🔒 Security Features
- Input validace (title required, not empty)
- ID validace (musí být číslo)
- SQL injection protection (parameterized queries)
- CORS enabled pro API access
- Error handling bez leak sensitive info

## 🚀 Production Deployment

### Environment Variables
```bash
# .env soubor
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

# Scale (pokud potřeba)
docker compose up -d --scale postgres=1
```

## 📈 Budoucí vylepšení
- [ ] Autentizace (JWT)
- [ ] Multi-user support
- [ ] Todo categories/tags
- [ ] Due dates
- [ ] Priority levels
- [ ] Search & filter
- [ ] Dark mode
- [ ] Offline support (PWA)
- [ ] Unit & integration tests
- [ ] CI/CD pipeline
