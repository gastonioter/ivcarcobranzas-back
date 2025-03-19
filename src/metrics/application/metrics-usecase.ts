import { CustomerStatus } from "@/customer/domain/types";
import { CustomerMongoRepository } from "@/customer/infraestructure/repository/mongo.repository";

export class GenerateDashboardMetricsUseCase {
  constructor(private readonly customerRepository: CustomerMongoRepository) {}

  async execute() {
    const actives = await this.customerRepository.countByStatus(
      CustomerStatus.ACTIVE,
    );

    const inactives = await this.customerRepository.countByStatus(
      CustomerStatus.INACTIVE,
    );
    return {
      actives,
      inactives,
    };
  }
}
