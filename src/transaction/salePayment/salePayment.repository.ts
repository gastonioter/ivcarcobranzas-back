import { SalePayment } from "./salePayment.entity";

export interface SalePaymentRepository {
  addPayment(uuid: string, data: SalePayment): Promise<SalePayment>;

  updatePaymentStatus({
    saleID,
    paymentID,
    status,
  }: {
    saleID: string;
    paymentID: string;
    status: string;
  }): Promise<SalePayment>;

  getPayments(saleID: string): Promise<SalePayment[]>;
}
