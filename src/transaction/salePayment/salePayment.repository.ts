import { Sale } from "../sale/domain/sale.entity";
import { SalePayment } from "./salePayment.entity";

export interface SalePaymentRepository {
  update({
    saleID,
    paymentID,
    status,
  }: {
    saleID: string;
    paymentID: string;
    status: string;
  }): Promise<Sale>;

  findAll(saleID: string): Promise<SalePayment[]>;
}
