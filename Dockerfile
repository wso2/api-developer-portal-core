FROM node:22-bullseye

ENV DEBIAN_FRONTEND=noninteractive 

RUN apt-get update && apt-get install -y --no-install-recommends \
    bash \
    coreutils \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 8080

RUN useradd -m -u 10001 -s /bin/bash appuser
USER appuser

CMD ["node", "src/app.js"]
