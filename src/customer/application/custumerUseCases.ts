import { CustomerDTO } from "../adapters/CustomerDTO";
import { CreateCustomerDTO, EditCustomerDTO } from "../adapters/inputDTO";
import { CustomerEntity } from "../domain/customer.entity";
import { CustomerRepository } from "../domain/customer.repository";
import { CustomerStatus } from "../domain/types";

export class CustomerUseCases {
  constructor(private readonly customerRepository: CustomerRepository) {}

  deleteCustomer = async (uuid: string) => {
    return await this.customerRepository.deleteCustomer(uuid);
  };

  editCustomer = async (uuid: string, customer: EditCustomerDTO) => {
    return await this.customerRepository.editCustomer(uuid, customer);
  };

  getCustomer = async (uuid: string) => {
    return await this.customerRepository.getCustomer(uuid);
  };

  getCustomers = async (): Promise<CustomerDTO[]> => {
    const customers = await this.customerRepository.getCustomers();
    return customers.map((customer) => new CustomerDTO(customer));
  };

  createCustomer = async (
    customer: CreateCustomerDTO,
  ): Promise<CustomerDTO> => {
    const exists = await this.customerRepository.checkIfExistsOne(
      customer.email,
      customer.phone,
    );

    if (exists) {
      throw new Error("Ya existe un cliente con ese email o celular.");
    }

    const costumerEntity = CustomerEntity.new({
      email: customer.email,
      firstName: customer.firstName,
      lastName: customer.lastName,
      phone: customer.phone,
      category: customer.category,
    });

    const saved = await this.customerRepository.createCustomer(costumerEntity);

    return new CustomerDTO(saved);
  };

  updateStatus = async (uuid: string, status: CustomerStatus) => {
    return await this.customerRepository.updateStatus(uuid, status);
  };
}
