FROM node:20

WORKDIR /home/node/app

COPY package*.json ./

COPY tsconfig.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start"]



# # Usa la imagen oficial de MongoDB como base
# FROM mongo:latest

# # Copia tu archivo de configuración mongod.conf al contenedor
# COPY mongod.conf /etc/mongod.conf

# # Expone el puerto estándar de MongoDB
# EXPOSE 27017

# # Inicia MongoDB usando el archivo de configuración
# CMD ["mongod", "--config", "/etc/mongod.conf"]
