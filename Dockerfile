FROM node:18-bullseye
ENV DEBIAN_FRONTEND=noninteractive 

RUN apt-get update && apt-get install -y \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . .

RUN npm install
EXPOSE 8080

RUN useradd -m -u 10001 -s /bin/bash appuser
USER 10001

CMD ["node", "src/app.js"]