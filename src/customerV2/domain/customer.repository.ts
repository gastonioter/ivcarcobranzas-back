import { CustomerFilter } from "../infra/mongo.repository";
import { Customer } from "./customer.entity.";

export interface CustomerRepository {
  save(uuid: string, data: Customer): Promise<void>;
  findById(uuid: string): Promise<null | Customer>;
  findAll(filters: CustomerFilter): Promise<Customer[]>;
}
