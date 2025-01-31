# Usa la imagen oficial de MongoDB como base
FROM mongo:latest

# Copia tu archivo de configuración mongod.conf al contenedor
COPY mongod.conf /etc/mongod.conf

# Expone el puerto estándar de MongoDB
EXPOSE 27017

# Inicia MongoDB usando el archivo de configuración
CMD ["mongod", "--config", "/etc/mongod.conf"]
