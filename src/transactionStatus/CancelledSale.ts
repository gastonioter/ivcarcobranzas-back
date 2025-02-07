import { SaleStatus, TransactionType } from "../sale/domain/sale.entity";

export class CancelledSale {
  type: TransactionType.SALE;
  status:  SaleStatus.CANCELLED;

  constructor() {
    this.type = TransactionType.SALE;
    this.status = SaleStatus.CANCELLED;
  }
}
