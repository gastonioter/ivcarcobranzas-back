import { PaymentEntity, SaleEntity } from "./sale.entity";

export interface SaleRepository {
  save(sale: SaleEntity): Promise<SaleEntity | null>;
  findById(uuid: string): Promise<SaleEntity | null>;
  getTotalSalesNumber(): Promise<number>;
  findAll(): Promise<SaleEntity[]>;
  addPayment(uuid: string, data: PaymentEntity): Promise<SaleEntity | null>;
}
