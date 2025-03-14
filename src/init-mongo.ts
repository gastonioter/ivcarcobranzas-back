// init-mongo.js

// Conéctate a la base de datos admin para crear el usuario
var db: any = db.getSiblingDB("admin");

// Crear un usuario root si no existe
if (!db.system.users.findOne({ user: "root" })) {
  db.createUser({
    user: "root",
    pwd: "rootpassword", // Cambiar por la contraseña real
    roles: [{ role: "root", db: "admin" }],
  });
}

// Conéctate a la base de datos ivcarventas y crea un usuario con permisos limitados
db = db.getSiblingDB(process.env.MONGO_DB);

db.createUser({
  user: process.env.MONGO_USERNAME,
  pwd: process.env.MONGO_PASSWORD, // Cambiar por la contraseña real
  roles: [{ role: "readWrite", db: process.env.MONGO_DB }],
});
