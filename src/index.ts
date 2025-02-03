import express from "express";
import "./config/env";
import { userRoutes } from "./user";

import { MongoDB } from "./config/db";
import errorHandler from "./middlewares/errorHandlerMiddleware";
import { categoriesRoutes } from "./category";
import { productRoutes } from "./product";
import { customerRoutes } from "./customer";
import { salesRoutes } from "./sale";
import { monthlyFeeRoutes } from "./monthlyFee";

const app = express();

app.use(express.json());

const API_PORT = process.env.API_PORT || 3000;

app.use("/api/users", userRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/products", productRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/monthlyfees", monthlyFeeRoutes);

app.use(errorHandler);

MongoDB.getInstance().then(() => {
  app.listen(API_PORT, () => {
    console.log(`🚀 Server is running on port ${API_PORT} `);
  });
});
