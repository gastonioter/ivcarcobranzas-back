import { BudgetStatus, TransactionType } from "../sale/domain/sale.entity";

export class RejectedStatus {
  type: TransactionType.BUDGET;
  status: BudgetStatus.REJECTED;

  constructor() {
    this.type = TransactionType.BUDGET;
    this.status = BudgetStatus.REJECTED;
  }
}
