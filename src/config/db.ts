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
      let MONGO_URI: string;

      if (process.env.ENV === "dev") {
        MONGO_URI = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
      } else {
        MONGO_URI = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
      }

      const db = await mongoose.connect(MONGO_URI);

      MongoDB.connection = db.connection;
      console.log("🔥 MongoDB conectado exitosamente");
    } catch (error) {
      console.error("❌ Error al conectar MongoDB:", error);
      process.exit(1);
    }
  }
}
