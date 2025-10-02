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

echo "[run] Starting API on :5174 ..."
nohup node server.js > "$API_LOG" 2>&1 &
API_PID=$!
echo "$API_PID" > /tmp/laptop-api.pid
sleep 0.8
head -n 2 "$API_LOG" || true

if command -v npx >/dev/null 2>&1; then
  echo "[run] Starting static preview on :5173 ..."
  npx --yes serve -s "$ROOT_DIR" -l 5173 >/tmp/laptop-web.log 2>&1 &
  echo $! > /tmp/laptop-web.pid
fi

echo "[run] API:   http://localhost:5174"
echo "[run] Web:   http://localhost:5173"
echo "[run] Logs:  $API_LOG, /tmp/laptop-web.log"
