import { CustomerMongoRepository } from "../../customer/infraestructure/repository/mongo.repository";
import { Router } from "express";
import { GenerateDashboardMetricsUseCase } from "../application/metrics-usecase";
import { MetricsController } from "./metrics.ctrl";

const customersrepo = new CustomerMongoRepository();
const usercase = new GenerateDashboardMetricsUseCase(customersrepo);
const metricsController = new MetricsController(usercase);

export const router = Router();

router.get(
  "/",
  metricsController.generateDashboardMetrics.bind(metricsController),
);
