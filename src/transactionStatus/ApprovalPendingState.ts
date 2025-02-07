import { BudgetStatus, TransactionType } from "../sale/domain/sale.entity";

export class ApprovalPendingState {
  status: BudgetStatus.PENDING_APPROVAL;
  type: TransactionType.BUDGET;

  constructor() {
    this.type = TransactionType.BUDGET;
    this.status = BudgetStatus.PENDING_APPROVAL;
  }
}
