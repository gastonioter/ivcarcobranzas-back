import { CustomerEntity } from "../../customer/domain/customer.entity";
import { Cuota, CuotaStatus } from "./cuota.entity";

export interface CuotaRepository {
  save(customerId: string, cuota: Cuota): Promise<void>;
  update(customer: CustomerEntity): Promise<CustomerEntity>;
  findCustomerCuotas(customerId: string): Promise<CustomerEntity>;
  // countCuotas(customerId: string): Promise<number>;
}
