import { Customer } from "../domain/customer.entity.";
import { CustomerRepository } from "../domain/customer.repository";
import { CustomerModalidad } from "../../customer/domain/types";

export interface CreateCustomerDTO {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cuit: string;
  type: CustomerModalidad;
}

export class CreateCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(dto: CreateCustomerDTO): Promise<Customer> {
    const customer = Customer.create(
      dto.firstName,
      dto.lastName,
      dto.email,
      dto.phone,
      dto.cuit,
      dto.type,
    );

    await this.customerRepository.save(customer.getId(), customer);

    return customer;
  }
}

