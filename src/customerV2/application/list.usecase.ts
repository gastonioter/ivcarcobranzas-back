import { CustomerModalidad } from "../domain/customer.entity.";
import { CustomerRepository } from "../domain/customer.repository";
import { CustomerFilter } from "../infra/mongo.repository";

export interface CustomerDTO {
  uuid: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cuit: string;
  status: string;
  type: CustomerModalidad;
  createdAt: Date;
  updatedAt: Date;
}

export class ListCustomersUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(filters: CustomerFilter): Promise<CustomerDTO[]> {
    const customers = await this.customerRepository.findAll(filters);
    return customers.map((customer) => customer.toDTO());
  }
}
