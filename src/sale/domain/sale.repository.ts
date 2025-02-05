import { SaleDetailsDTO, SaleDTO } from "./sale.dto";
import { PaymentEntity, SaleEntity } from "./sale.entity";

export interface SaleRepository {
  save(sale: SaleEntity): Promise<SaleEntity | null>;
  findById(uuid: string): Promise<SaleDetailsDTO | null>;
  getTotalSalesNumber(): Promise<number>;
  findAll(): Promise<SaleDTO[]>;
  addPayment(uuid: string, data: PaymentEntity): Promise<SaleEntity | null>;
}
