import { CustomerEntity } from "./customer.entity";
import { EditCustomerRequest } from "./customer.validations";

export interface CustomerRepository {
  createCustomer(customer: CustomerEntity): Promise<CustomerEntity>;
  editCustomer(customer: EditCustomerRequest): Promise<CustomerEntity>;
  deleteCustomer(uuid: string): Promise<CustomerEntity>;
  getCustomer(uuid: string): Promise<CustomerEntity>;
  getCustomers(): Promise<CustomerEntity[]>;
}
