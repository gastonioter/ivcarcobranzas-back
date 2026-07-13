import cors from "cors";
import express from "express";

import "./boostrap/env";
import { userRoutes } from "./user";

import morgan from "morgan";
import { categoriesRoutes } from "./category";
import errorHandler from "./middlewares/errorHandlerMiddleware";
import { paymentRoutes } from "./payments";
import { productRoutes } from "./product";
import { SalesRoutes } from "./transaction/sale";

import { MongoDB } from "./boostrap/db";
import { cuotaV2Router } from "./cuotaV2/infra/cuota.routes";
import { dashboardRouter } from "./dashboard";
import { authorizationMiddleware } from "./middlewares/authorizationMiddleware";
import { PrintRoutes } from "./prints";
import { BudgetRoutes } from "./transaction/budget";
import { customerV2Router } from "./customerV2";
import { cuotaPaymentRouter } from "./cuota-payment";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

const API_PORT = process.env.API_PORT || 3000;

app.use("/api/auth", userRoutes);

/* private routes */

if (process.env.ENV !== "dev") {
  // Skip auth in dev environment
  app.use(authorizationMiddleware);
}

app.use("/api/prints", PrintRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/products", productRoutes);
app.use("/api/sales", SalesRoutes);
app.use("/api/budgets", BudgetRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/v2/cuotas", cuotaV2Router);
app.use("/api/v2/customers", customerV2Router);
app.use("/api/cuota-payments", cuotaPaymentRouter);
app.use("/api/dashboard", dashboardRouter);
app.use(errorHandler);

MongoDB.getInstance().then(() => {
  app.listen(API_PORT, () => {
    console.log(`🚀 Server is running on port ${API_PORT} `);
  });
});

export default app;
