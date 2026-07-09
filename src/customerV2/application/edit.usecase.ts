import { Customer } from "../domain/customer.entity.";
import { CustomerRepository } from "../domain/customer.repository";

export interface EditCustomerDTO {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  cuit?: string;
}

export class EditCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(uuid: string, dto: EditCustomerDTO): Promise<Customer> {
    const customer = await this.customerRepository.findById(uuid);
    if (!customer) throw new Error("Customer not found");

    const updated = Customer.fromPersistence({
      uuid: customer.getId(),
      firstName: dto.firstName ?? customer.firstName,
      lastName: dto.lastName ?? customer.lastName,
      email: dto.email ?? customer.email,
      phone: dto.phone ?? customer.phone,
      cuit: dto.cuit ?? customer.cuit,
      status: customer.status,
      type: customer.type,
      createdAt: customer.createdAt,
    });

    await this.customerRepository.save(uuid, updated);

    return updated;
  }
}
