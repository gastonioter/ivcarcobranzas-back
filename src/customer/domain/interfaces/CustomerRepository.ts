import { EditCustomerDTO } from "../../adapters/CreateCustomerDTO";
import { CustomerEntity } from "../customer.entity";
import { CustomerStatus } from "../types";

export interface CustomerRepository {
  createCustomer(customer: CustomerEntity): Promise<CustomerEntity>;
  editCustomer(
    uuid: string,
    customer: EditCustomerDTO,
  ): Promise<CustomerEntity>;
  deleteCustomer(uuid: string): Promise<void>;
  getCustomer(uuid: string): Promise<CustomerEntity>;
  checkIfExistsOne(email: string, phone: string): Promise<boolean>;
  updateStatus(
    uuid: string,
    status: CustomerStatus,
  ): Promise<CustomerEntity | null>;

  // TODO: implementar filtros y ordenamiento por apellido en el repo
  getCustomers(): Promise<CustomerEntity[]>;
}
