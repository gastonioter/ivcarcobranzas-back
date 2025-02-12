import { SalePayment } from "./salePayment.entity";

export interface SalePaymentRepository {
  save(uuid: string, data: SalePayment): Promise<SalePayment>;

  update({
    saleID,
    paymentID,
    status,
  }: {
    saleID: string;
    paymentID: string;
    status: string;
  }): Promise<SalePayment>;

  findAll(saleID: string): Promise<SalePayment[]>;
}
