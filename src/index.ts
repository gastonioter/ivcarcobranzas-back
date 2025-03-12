import cors from "cors";
import express, { Request, Response } from "express";

import "./config/env";
import { userRoutes } from "./user";

import morgan from "morgan";
import { categoriesRoutes } from "./category";
import { MongoDB } from "./config/db";
import { customerRoutes } from "./customer";
import { authorizationMiddleware } from "./middlewares/authorizationMiddleware";
import errorHandler from "./middlewares/errorHandlerMiddleware";
import { paymentRoutes } from "./payments";
import { productRoutes } from "./product";
import { SalesRoutes } from "./transaction/sale";

import { CloudCategoryRoutes } from "./cloudCategory";
import { PrintRoutes } from "./prints";
import { BudgetRoutes } from "./transaction/budget";
import { cuotaRoutes } from "./cuota";
import connectDB from "./config/mongo";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

const API_PORT = process.env.API_PORT || 3000;

app.get("/", async (req: Request, res: Response) => {
  try {
    // Llamar a la función para asegurarse de que la base de datos esté conectada
    await connectDB();
    res.send("Conexión a MongoDB exitosa");
  } catch (error) {
    res.status(500).send("Error al conectar con la base de datos");
  }
});

app.use("/api/auth", userRoutes);

/* private routes */

//app.use(authorizationMiddleware);

app.use("/api/prints", PrintRoutes);

app.use("/api/categories", categoriesRoutes);
app.use("/api/products", productRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/sales", SalesRoutes);
app.use("/api/budgets", BudgetRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/cloudcategories", CloudCategoryRoutes);
app.use("/api/cuotas", cuotaRoutes);

app.use(errorHandler);

MongoDB.getInstance().then(() => {
  app.listen(API_PORT, () => {
    console.log(`🚀 Server is running on port ${API_PORT} `);
  });
});

export default app;
