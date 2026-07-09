import { Customer } from "../domain/customer.entity.";
import { CustomerRepository } from "../domain/customer.repository";

export class ListCustomersUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(): Promise<Customer[]> {
    return this.customerRepository.findAll();
  }
}
