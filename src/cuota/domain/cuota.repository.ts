import { CustomerEntity } from "../../customer/domain/customer.entity";
import { Cuota, CuotaStatus } from "./cuota.entity";

export interface CuotaRepository {
  save(customerId: string, cuota: Cuota): Promise<void>;
  update(uuid: string, status: CuotaStatus): Promise<Cuota>;
  findCustomerCuotas(customerId: string): Promise<CustomerEntity>;
}
