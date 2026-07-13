import { MongoCuotaRepository } from "../cuotaV2/infra/cuota.repository";
import { CustomerStatus } from "../customerV2/domain/customer.entity.";
import { MongoCustomerRepository } from "../customerV2/infra/mongo.repository";
import { DashboardQueriesRepository } from "./dashboard.repository";

export class GenerateDashboardMetricsUseCase {
  constructor(
    private readonly customerRepository: MongoCustomerRepository,
    private readonly dashboardRepository: DashboardQueriesRepository,
  ) {}

  async execute() {
    const customers = await this.customerRepository.findAll();

    const actives = customers.filter(
      (c) => c.status === CustomerStatus.ACTIVE,
    ).length;

    const inactives = customers.filter(
      (c) => c.status === CustomerStatus.INACTIVE,
    ).length;

    const resultCuotas = await this.dashboardRepository.aggregateCuotas();
    const reducedCuotas = resultCuotas[0] || {
      totalPaidCuotas: 0,
      totalRevenue: 0,
      totalGeneratedCuotas: 0,
    };

    const [deudores, revenueByMonth] = await Promise.all([
      this.dashboardRepository.findDeudores(),
      this.dashboardRepository.revenueByMonth(),
    ]);

    return {
      actives,
      inactives,
      totalGeneratedCutoas: reducedCuotas.totalGeneratedCuotas,
      totalRevenue: reducedCuotas.totalRevenue,
      totalPaidCuotas: reducedCuotas.totalPaidCuotas,
      deudores,
      revenueByMonth,
    };
  }
}
