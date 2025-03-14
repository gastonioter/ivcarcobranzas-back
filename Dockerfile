# Etapa 1: Compilación
FROM node:20-slim AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Etapa 2: Ejecución 
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app ./
CMD ["npm", "run", "start"]