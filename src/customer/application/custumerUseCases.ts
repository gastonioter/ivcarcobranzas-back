import { CustomerStatus } from "../domain/customer.entity";
import { CustomerAlreadyExistsError } from "../domain/customer.exceptions";
import { CustomerRepository } from "../domain/customer.repository";
import {
  CreateCustomerRequest,
  EditCustomerRequest,
} from "../domain/customer.validations";
import { CustomerValue } from "../domain/customer.value";

export class CustomerUseCases {
  constructor(private readonly customerRepository: CustomerRepository) {}

  deleteCustomer = async (uuid: string) => {
    return await this.customerRepository.deleteCustomer(uuid);
  };

  editCustomer = async (uuid: string, customer: EditCustomerRequest) => {
    return await this.customerRepository.editCustomer(uuid, customer);
  };

  getCustomer = async (uuid: string) => {
    return await this.customerRepository.getCustomer(uuid);
  };

  getCustomers = async () => {
    return await this.customerRepository.getCustomers();
  };

  createCustomer = async (customer: CreateCustomerRequest) => {
    const customerValue = new CustomerValue({
      ...customer,
      montoMes: customer.montoMes || 0,
    });

    return await this.customerRepository.createCustomer(customerValue);
  };

  updateStatus = async (uuid: string, status: CustomerStatus) => {
    return await this.customerRepository.updateStatus(uuid, status);
  };
}
