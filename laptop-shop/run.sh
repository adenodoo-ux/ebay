#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR=$(cd "$(dirname "$0")" && pwd)
cd "$ROOT_DIR"

echo "[run] Installing deps if needed..."
npm ci || npm i

echo "[run] Generating Prisma client..."
npx --yes prisma generate

echo "[run] Running migrations..."
npx --yes prisma migrate deploy || npx --yes prisma migrate dev --name init --skip-seed

echo "[run] Seeding database..."
node prisma/seed.js || true

API_LOG=${API_LOG:-/tmp/laptop-api.log}

echo "[run] Starting server (API + static) on :5174 ..."
nohup node server.js > "$API_LOG" 2>&1 &
API_PID=$!
echo "$API_PID" > /tmp/laptop-api.pid
sleep 0.8
head -n 2 "$API_LOG" || true

echo "[run] URL:   http://localhost:5174"
echo "[run] Logs:  $API_LOG"
