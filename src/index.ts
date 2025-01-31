import express from "express";
import "./config/env";
import { userRoutes } from "./user";

import { MongoDB } from "./config/db";
import errorHandler from "./errorHandlerMiddleware";

const app = express();

app.use(express.json());

const API_PORT = process.env.API_PORT || 3000;

app.use("/api/users", userRoutes);
app.use(errorHandler);

MongoDB.getInstance().then(() => {
  app.listen(API_PORT, () => {
    console.log(`🚀 Server is running on port ${API_PORT} `);
  });
});
