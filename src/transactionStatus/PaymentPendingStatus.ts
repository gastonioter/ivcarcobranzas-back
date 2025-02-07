import { SaleStatus, TransactionType } from "../sale/domain/sale.entity";

export class PaymentPendingStatus {
  type: TransactionType.SALE;
  status: SaleStatus.PENDING_PAYMENT;

  constructor() {
    this.type = TransactionType.SALE;
    this.status = SaleStatus.PENDING_PAYMENT;
  }
}
