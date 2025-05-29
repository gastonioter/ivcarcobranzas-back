import { CuotaStatus } from "@/cuota/domain/cuota.entity";
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
    const totalGeneratedCuotasForCurrentMonth = activeCustomers.filter((c) => {
      return c

        .getCuotas()
        .some(
          (cuota) =>
            cuota.getMonth() == currentMonth && cuota.getYear() == currentYear,
        );
    }).length;

    const totalPaidAmounthForCurrentMonth = customers.reduce(
      (acc, customer) => {
        const currentCuota = customer
          .getCuotas()
          .find(
            (cuota) =>
              cuota.getMonth() === currentMonth &&
              cuota.getYear() === currentYear,
          );
        return currentCuota && currentCuota.isPaid()
          ? acc + currentCuota.getAmount()
          : acc;
      },
      0,
    );
    return {
      actives,
      inactives,
      generatedCutoas: totalGeneratedCuotasForCurrentMonth,
      totalPaidAmounth: totalPaidAmounthForCurrentMonth,
    };
  }
}
