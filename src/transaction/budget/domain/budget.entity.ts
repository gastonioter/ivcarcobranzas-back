import { EntityId } from "@/shared/valueObjects/entityId.vo";
import { Detail, ITransaction, Transaction } from "../../domain/Transaction";
interface IBudget extends ITransaction {
  status: BudgetStatus;
  approvedAt?: Date;
  expiresAt?: Date;
}
export class Budget extends Transaction {
  private status: BudgetStatus;
  private approvedAt?: Date;
  private expiresAt?: Date;
  constructor({
    status,
    createdAt,
    customerId,
    serie,
    uuid,
    details,
    totalAmount,
    approvedAt,
    iva,
    expiresAt,
  }: IBudget) {
    super(uuid, serie, customerId, details, totalAmount, iva, createdAt);
    this.approvedAt = approvedAt;
    this.status = status;
    this.expiresAt = expiresAt;
  }

  static new({
    customerId,
    details,
    iva,
    expiresAt,
  }: {
    customerId: string;
    details: Detail[];
    iva: number;
    expiresAt?: Date;
  }): Budget {
    const totalAmount = Transaction.computeTotalAmount(details);
    const createdAt = new Date();
    const serie = Transaction.generateSerie();
    const uuid = EntityId.create();
    const status = BudgetStatus.PENDING;
    return new Budget({
      uuid,
      createdAt,
      status,
      customerId,
      details,
      totalAmount,
      iva,
      serie,
      expiresAt,
    });
  }

  isExpierd() {
    return this.expiresAt ? this.expiresAt < new Date() : false;
  }

  approve() {
    if (this.isRejected()) {
      throw new Error("El presupuesto ya fue rechazado, no se puede aprobar");
    }
    this.status = BudgetStatus.APPROVED;
    this.approvedAt = new Date();
  }
  reject() {
    if (this.isApproved()) {
      throw new Error(
        "El presupuesto ya fue aprobado, no se puede rechazar, puedes anular la venta en su lugar.",
      );
    }
    this.status = BudgetStatus.REJECTED;
  }
  markAsPending() {
    if (this.isRejected()) {
      throw new Error(
        "El presupuesto ya fue rechazado, no se puede marcar como pendiente",
      );
    }
    this.status = BudgetStatus.PENDING;
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
  getAppovedAt() {
    return this.approvedAt;
  }
}

export enum BudgetStatus {
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  PENDING = "PENDING",
}
