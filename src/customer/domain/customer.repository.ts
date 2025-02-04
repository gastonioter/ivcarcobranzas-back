import { CustomerEntity } from "./customer.entity";
import { EditCustomerRequest } from "./customer.validations";

export interface CustomerRepository {
  createCustomer(customer: CustomerEntity): Promise<CustomerEntity | null>;
  editCustomer(customer: EditCustomerRequest): Promise<CustomerEntity>;
  deleteCustomer(uuid: string): Promise<CustomerEntity>;
  getCustomer(uuid: string): Promise<CustomerEntity>;

  // TODO: implementar filtros y ordenamiento por apellido en el repo
  getCustomers(): Promise<CustomerEntity[]>;
}
