# StudentManagement - Getting Started

## Prerequisites

- Docker & Docker Compose
- Node.js / pnpm
- PHP 8.2+ (for local backend development)

## Quick Start Checklist

### 1. Start Docker Services (Database, Mercure)

```bash
# From project root
docker compose up -d database mercure
```

### 2. Start Backend (PHP Server)

```bash
# Option A: Using Docker
docker compose up -d php

# Option B: Local PHP server (from back directory)
cd back
php -S 0.0.0.0:8080 -t public
```

### 3. Start Frontend

```bash
# From front directory
cd front
pnpm install   # First time only
pnpm dev
```

### 4. Access the App

- Frontend: http://localhost:3001
- Backend API: http://localhost:8080/api

## Common Commands

### Stop All Services

```bash
# Stop Docker containers
docker compose down

# Kill local PHP server
pkill -f "php -S"

# Kill frontend dev server
pkill -f "nuxt"
```

### Check Running Services

```bash
# Docker containers
docker compose ps

# Ports in use
lsof -i :3001   # Frontend
lsof -i :8080   # Backend
lsof -i :5432   # Database
```

### Reset Database

```bash
docker compose down -v    # Remove volumes
docker compose up -d database mercure
php bin/console doctrine:schema:update --force --env=dev
```

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3001
fuser -k 3001/tcp

# Kill process on port 8080
fuser -k 8080/tcp
```

### Clear Nuxt Cache

```bash
rm -rf .nuxt .output node_modules/.cache
pnpm dev
```

### View Backend Logs

```bash
# Docker
docker compose logs -f php

# Local
tail -f /tmp/php.log
```