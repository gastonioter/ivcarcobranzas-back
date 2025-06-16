import { CustomerDTO } from "../../customer/adapters/CustomerDTO";
import { CustomerStatus } from "../../customer/domain/types";
import { CustomerMongoRepository } from "../../customer/infraestructure/repository/mongo.repository";

export class GenerateDashboardMetricsUseCase {
  constructor(private readonly customerRepository: CustomerMongoRepository) {}

  async execute() {
    const customers = await this.customerRepository.getCustomers();

    const actives = await this.customerRepository.countByStatus(
      CustomerStatus.ACTIVE,
    );

    const inactives = await this.customerRepository.countByStatus(
      CustomerStatus.INACTIVE,
    );

    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const activeCustomers = customers.filter((c) => c.isActive());

    const currentCuotas = activeCustomers
      .flatMap((c) => c.getCuotas())
      .filter(
        (cuota) =>
          cuota.getMonth() == currentMonth && cuota.getYear() == currentYear,
      );
    const reducedCuotas = currentCuotas.reduce(
      (acc, cuota) => {
        return {
          ...acc,
          totalPaidCuotas: cuota.isPaid()
            ? ++acc.totalPaidCuotas
            : acc.totalPaidCuotas,
          totalRevenue:
            acc.totalRevenue + (cuota.isPaid() ? cuota.getAmount() : 0),
        };
      },
      {
        totalPaidCuotas: 0,
        totalRevenue: 0,
      },
    );

    const deudores = customers
      .filter((c) => c.esDeudor())
      .map((c) => new CustomerDTO(c));

    return {
      actives,
      inactives,
      totalGeneratedCutoas: currentCuotas.length,
      totalRevenue: reducedCuotas.totalRevenue,
      totalPaidCuotas: reducedCuotas.totalPaidCuotas,
      deudores,
    };
  }
}
