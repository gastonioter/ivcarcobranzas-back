import { CustomerEntity, CustomerStatus } from "./customer.entity";
import { EditCustomerRequest } from "./customer.validations";

export interface CustomerRepository {
  createCustomer(customer: CustomerEntity): Promise<CustomerEntity | null>;
  editCustomer(
    uuid: string,
    customer: EditCustomerRequest
  ): Promise<CustomerEntity | null>;
  deleteCustomer(uuid: string): Promise<CustomerEntity>;
  getCustomer(uuid: string): Promise<CustomerEntity>;

  updateStatus(
    uuid: string,
    status: CustomerStatus
  ): Promise<CustomerEntity | null>;

  // TODO: implementar filtros y ordenamiento por apellido en el repo
  getCustomers(): Promise<CustomerEntity[]>;
}
