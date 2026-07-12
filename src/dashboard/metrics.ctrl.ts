import { Request, Response } from "express";
import { GenerateDashboardMetricsUseCase } from "./metrics-usecase";

export class MetricsController {
  constructor(
    private readonly metricsUseCase: GenerateDashboardMetricsUseCase,
  ) {}

  generateDashboardMetrics = async (req: Request, res: Response) => {
    const metrics = await this.metricsUseCase.execute();
    res.status(200).json(metrics);
  };
}
