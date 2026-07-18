import { ResourceNotFoundException } from "../../shared/domain/exceptions";
import { CustomerRepository } from "../infra/mongo.repository";

export class CustomerDetailUseCase {
  constructor(private readonly customersRepo: CustomerRepository) {}

  async execute(id: string) {
    const customer = await this.customersRepo.findById(id);
    if (!customer) {
      throw new ResourceNotFoundException("CUSTOMER", id);
    }

    return customer.toDTO();
  }
}
