import { Request, Response } from "express";
import { GenerateDashboardMetricsUseCase } from "../application/metrics-usecase";

export class MetricsController {
  constructor(
    private readonly metricsUseCase: GenerateDashboardMetricsUseCase,
  ) {}

  async generateDashboardMetrics(req: Request, res: Response) {
    const metrics = await this.metricsUseCase.execute();
    res.status(200).json(metrics);
  }
}
