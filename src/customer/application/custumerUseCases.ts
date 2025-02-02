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

  editCustomer = async (customer: EditCustomerRequest) => {
    return await this.customerRepository.editCustomer(customer);
  };

  getCustomer = async (uuid: string) => {
    return await this.customerRepository.getCustomer(uuid);
  };

  getCustomers = async () => {
    return await this.customerRepository.getCustomers();
  };

  createCustomer = async (customer: CreateCustomerRequest) => {
    const customerValue = new CustomerValue(customer);

    return await this.customerRepository.createCustomer(customerValue);
  };
}
