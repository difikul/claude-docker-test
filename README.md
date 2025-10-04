# 🐳 Claude Docker Test

Testovací projekt pro ověření vývojového prostředí: Docker + Node.js + PostgreSQL + GitHub CLI

## 📋 Požadavky

- Node.js 18+
- Docker & Docker Compose
- Git
- GitHub CLI (gh)

## 🚀 Instalace a spuštění

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

Počkejte 5-10 sekund, než se databáze inicializuje.

### 4. Spuštění Express serveru
```bash
npm run dev
```

Server poběží na `http://localhost:3000`

## 🧪 Testování API

### Health Check
```bash
curl http://localhost:3000/health
```

**Očekávaný výstup:**
```json
{
  "status": "OK",
  "message": "Express server is running",
  "timestamp": "2025-10-04T..."
}
```

### Test databázového připojení
```bash
curl http://localhost:3000/api/test
```

**Očekávaný výstup:**
```json
{
  "status": "success",
  "message": "Database connection successful",
  "data": {
    "currentTime": "2025-10-04T...",
    "postgresVersion": "PostgreSQL 16..."
  }
}
```

### Setup databáze (vytvoření tabulky a testovacích dat)
```bash
curl -X POST http://localhost:3000/api/setup
```

### Získání uživatelů
```bash
curl http://localhost:3000/api/users
```

## 📚 API Dokumentace

| Metoda | Endpoint | Popis |
|--------|----------|-------|
| GET | `/health` | Health check serveru |
| GET | `/api/test` | Test připojení k databázi |
| POST | `/api/setup` | Vytvoření tabulky a vzorových dat |
| GET | `/api/users` | Získání všech uživatelů |

## 🛠 Příkazy

```bash
# Development
npm run dev          # Spustí server s nodemon (auto-reload)
npm start            # Spustí server v produkčním módu

# Docker
docker compose up -d           # Spustí PostgreSQL na pozadí
docker compose down            # Zastaví a odstraní kontejnery
docker compose logs -f postgres # Zobrazí logy PostgreSQL
docker compose ps              # Zobrazí stav kontejnerů

# Database
docker exec -it claude-postgres psql -U claude -d claude_test
```

## 🐛 Troubleshooting

### PostgreSQL kontejner se nespustí
```bash
# Zkontroluj logy
docker compose logs postgres

# Restartuj služby
docker compose restart
```

### Express nemůže najít PostgreSQL
```bash
# Ověř že PostgreSQL běží
docker ps | grep postgres

# Zkontroluj health check
docker compose ps
```

### Port 3000 nebo 5432 je obsazený
```bash
# Najdi proces na portu
sudo lsof -i :3000
sudo lsof -i :5432

# Změň port v .env nebo docker-compose.yml
```

## 📂 Struktura projektu

```
claude-docker-test/
├── Claude.MD              # Podrobná dokumentace projektu
├── README.md              # Tento soubor
├── docker-compose.yml     # PostgreSQL konfigurace
├── package.json           # Node.js závislosti
├── server.js              # Express aplikace
├── .env.example           # Příklad env proměnných
└── .gitignore            # Git ignore
```

## 🤝 Přispívání

1. Fork repozitáře
2. Vytvoř feature branch (`git checkout -b feature/amazing-feature`)
3. Commit změny (`git commit -m 'Add amazing feature'`)
4. Push do branch (`git push origin feature/amazing-feature`)
5. Otevři Pull Request

## 📝 Licence

MIT

## 👤 Autor

**Lukáš Scorvan**
- GitHub: [@difikul](https://github.com/difikul)
- Email: lscorvan@gmail.com

---

🤖 Vytvořeno s pomocí Claude Code
