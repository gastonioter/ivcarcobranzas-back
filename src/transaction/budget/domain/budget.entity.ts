import { ITransaction, Transaction } from "../../../transaction/Transaction";

interface IBudget extends ITransaction {
  status: BudgetStatus;
}
export class Budget extends Transaction {
  private status: BudgetStatus;

  constructor({
    status,
    createdAt,
    customer,
    serie,
    uuid,
    details,
    totalAmount,
  }: IBudget) {
    super({ uuid, serie, customer, createdAt, details, totalAmount });
    this.status = status;
  }

  isApproved() {
    return this.status == BudgetStatus.APPROVED;
  }
  isRejected() {
    return this.status == BudgetStatus.REJECTED;
  }
  isPending() {
    return this.status == BudgetStatus.PENDING;
  }
}

enum BudgetStatus {
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  PENDING = "PENDING",
}
