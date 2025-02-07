import { BudgetStatus, TransactionType } from "../sale/domain/sale.entity";

export class ApprovedStatus {
  status: BudgetStatus.APPROVED;
  type: TransactionType.BUDGET;

  constructor() {
    this.type = TransactionType.BUDGET;
    this.status = BudgetStatus.APPROVED;
  }
}
