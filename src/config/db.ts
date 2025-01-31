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
      const MONGO_URI = `mongodb://${process.env.MONTO_HOST}:${process.env.MONTO_PORT}/${process.env.MONGO_DB}`;

      const db = await mongoose.connect(MONGO_URI);

      MongoDB.connection = db.connection;
      console.log("🔥 MongoDB conectado exitosamente");
    } catch (error) {
      console.error("❌ Error al conectar MongoDB:", error);
      process.exit(1); // Cierra la aplicación si falla la conexión
    }
  }
}
