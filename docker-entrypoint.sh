#!/bin/bash
set -e

# Fail fast with a helpful message if config.yaml is missing or is a directory
# (Docker bind-mounts a missing host file as an empty directory).
if [ ! -f /app/config.yaml ] || [ ! -r /app/config.yaml ]; then
  echo "[entrypoint] ERROR: /app/config.yaml is missing or not readable." >&2
  echo "[entrypoint] Copy sample_config.yaml to config.yaml and mount it:" >&2
  echo "[entrypoint]   cp sample_config.yaml config.yaml" >&2
  exit 1
fi

CERT_DIR=/app/certs

if [ ! -f "$CERT_DIR/server.crt" ] || [ ! -f "$CERT_DIR/server.key" ]; then
  echo "[entrypoint] Generating self-signed TLS certificate..."
  openssl req -x509 -newkey rsa:2048 \
    -keyout "$CERT_DIR/server.key" \
    -out   "$CERT_DIR/server.crt" \
    -days 3650 -nodes \
    -subj "/CN=localhost/O=Developer Portal/C=US" \
    -addext "subjectAltName=DNS:localhost,IP:127.0.0.1" \
    2>/dev/null
  echo "[entrypoint] Self-signed certificate written to $CERT_DIR"
fi

exec node src/app.js
