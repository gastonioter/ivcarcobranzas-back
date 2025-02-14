import { Sale } from "./sale.entity";

export interface SaleRepository {
  save(sale: Sale): Promise<Sale>;
  findAll(): Promise<Sale[]>;
  findByUuid(uuid: string): Promise<Sale>;
  update(sale: Sale): Promise<Sale>;
  getSalesByCustomer(uuid: string): Promise<Sale[]>;
}
