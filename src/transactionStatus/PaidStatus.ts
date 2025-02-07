import { SaleStatus, TransactionType } from "../sale/domain/sale.entity";

export class PaidStatus {
  type: TransactionType.SALE;
  status: SaleStatus.PAID;

  constructor() {
    this.type = TransactionType.SALE;
    this.status = SaleStatus.PAID;
  }
}
