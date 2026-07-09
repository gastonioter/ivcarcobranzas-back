import { Customer } from "./customer.entity.";

export interface CustomerRepository {
  findById(uuid: string): Promise<null | Customer>
  findAll(): Promise<Customer[]>
  save(uuid: string, data: Customer): Promise<void>
}