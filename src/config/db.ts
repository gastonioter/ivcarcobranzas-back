import mongoose from "mongoose";

export class MongoDB {
  private static instance: MongoDB;
  private static connection: mongoose.Connection;

  private constructor() {}

  public static async getInstance(): Promise<mongoose.Connection> {
    if (!MongoDB.instance) {
      MongoDB.instance = new MongoDB();
      await MongoDB.connect();
    }
    return MongoDB.connection;
  }

  private static async connect(): Promise<void> {
    try {
      // MONGO_URL es la de production, si no está definida, se usa la conexión local
      const MONGO_URI = process.env.MONGO_URL
        ? `${process.env.MONGO_URL}`
        : `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;

      const db = await mongoose.connect(MONGO_URI);

      MongoDB.connection = db.connection;
      console.log("🔥 MongoDB conectado exitosamente");
    } catch (error) {
      console.error("❌ Error al conectar MongoDB:", error);
      process.exit(1); // Cierra la aplicación si falla la conexión
    }
  }
}

