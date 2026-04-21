#!/bin/bash
set -e

echo "[entrypoint] Starting Developer Portal..."
exec node src/app.js
