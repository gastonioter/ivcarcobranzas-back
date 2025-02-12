import { PaymentMethods, SalePaymentStatus } from "../salePayment.entity";

export interface SalePaymentsDTO {
  uuid: string;
  amount: number;
  paymentMethod: PaymentMethods;
  status: SalePaymentStatus;
  createdAt: Date;
}
