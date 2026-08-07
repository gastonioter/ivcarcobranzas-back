# State 1: Build the application
FROM node:20 AS builder

WORKDIR /src

COPY package*.json ./
COPY tsconfig.json ./

RUN npm ci

COPY assets ./assets
COPY src ./src

RUN npm run build

# State 2: Run the application
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /src/dist .
COPY --from=builder /src/assets ./assets
COPY package*.json ./
RUN npm ci --omit=dev

EXPOSE 3001

CMD ["node", "/app/index.js"]