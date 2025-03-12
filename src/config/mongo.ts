import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    // Si ya está conectado, no hacer nada
    return;
  }

  try {
    const MONGO_URI = process.env.MONGO_URL
      ? `${process.env.MONGO_URL}`
      : `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;

    await mongoose.connect(MONGO_URI);
    isConnected = true;
    console.log("Conexión a MongoDB exitosa");
  } catch (error) {
    console.error("Error al conectar a MongoDB", error);
    throw new Error("Error de conexión a MongoDB");
  }
};

export default connectDB;
