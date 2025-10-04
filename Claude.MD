# Claude Docker Test Project

## 📋 Popis projektu
Testovací projekt demonstrující integraci Docker (PostgreSQL) s Node.js/Express aplikací. Slouží k ověření správného nastavení vývojového prostředí.

## 🛠 Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Databáze:** PostgreSQL 16 (Docker)
- **Containerizace:** Docker & Docker Compose
- **Dev Tools:** nodemon

## 🏗 Architektura
```
┌─────────────────┐
│   Express API   │ (localhost:3000)
│    (server.js)  │
└────────┬────────┘
         │ pg client
         ▼
┌─────────────────┐
│   PostgreSQL    │ (localhost:5432)
│  (Docker container)
└─────────────────┘
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

### 3. Spustit Express server
```bash
npm run dev
```

### 4. Testovat endpointy
```bash
# Health check
curl http://localhost:3000/health

# Test databáze
curl http://localhost:3000/api/test
```

## 📝 Příkazy

| Příkaz | Popis |
|--------|-------|
| `npm run dev` | Spustí dev server s nodemon |
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

### Express se nemůže připojit k DB
```bash
# Ověř že PostgreSQL běží
docker ps

# Zkontroluj health check
docker compose ps
```

### Port 5432 je již používán
```bash
# Najdi proces na portu 5432
sudo lsof -i :5432

# Nebo změň port v docker-compose.yml
```

## 📂 Struktura projektu
```
claude-docker-test/
├── Claude.MD              # Dokumentace projektu
├── docker-compose.yml     # Docker služby
├── package.json           # Node.js projekt
├── server.js              # Express server
├── .env.example           # Příklad env vars
├── .gitignore            # Git ignore
└── README.md             # Uživatelská dokumentace
```
