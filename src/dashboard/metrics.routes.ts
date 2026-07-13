import { Router } from "express";
import { GenerateDashboardMetricsUseCase } from "./metrics-usecase";
import { MetricsController } from "./metrics.ctrl";
import { MongoCuotaRepository } from "../cuotaV2/infra/cuota.repository";
import { MongoCustomerRepository } from "../customerV2/infra/mongo.repository";
import { MongoDashboardRepository } from "./dashboard.repository";

const customersRepo = new MongoCustomerRepository();
const dashboardRepo = new MongoDashboardRepository();
const usercase = new GenerateDashboardMetricsUseCase(
  customersRepo,
  dashboardRepo,
);

const metricsController = new MetricsController(usercase);

export const router = Router();

router.get("/", metricsController.generateDashboardMetrics);
