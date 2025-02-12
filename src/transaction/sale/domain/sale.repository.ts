import {
  SalePayment,
  SalePaymentStatus,
} from "../../salePayment/salePayment.entity";
import { Sale } from "./sale.entity";

export interface SaleRepository {
  save(sale: Sale): Promise<Sale>;
  findAll(): Promise<Sale[]>;
  findByUuid(uuid: string): Promise<Sale>;
  update(sale: Sale): Promise<Sale>;
  savePayment(saleId: string, payment: SalePayment): Promise<Sale>;
  updatePayment(
    saleId: string,
    paymentId: string,
    payment: SalePaymentStatus,
  ): Promise<Sale>;
}
