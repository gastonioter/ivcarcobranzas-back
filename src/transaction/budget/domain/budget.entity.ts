import { EntityId } from "../../../shared/valueObjects/entityId.vo";
import { Detail, ITransaction, Transaction } from "../../domain/Transaction";
import { IBudget as IPersistedBudget } from "../infraestructure/budget.schema";

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
    sellerId,
  }: IBudget) {
    super(
      uuid,
      serie,
      customerId,
      details,
      totalAmount,
      iva,
      createdAt,
      sellerId,
    );
    this.approvedAt = approvedAt;
    this.status = status;
    this.expiresAt = expiresAt;
  }

  static new({
    customerId,
    details,
    iva,
    expiresAt,
    sellerId,
  }: {
    customerId: string;
    details: Detail[];
    iva: number;
    expiresAt?: Date;
    sellerId: string;
  }): Budget {
    if (expiresAt && expiresAt < new Date())
      throw new Error(
        "La fecha de expiración no puede ser menor a la fecha actual",
      );

    if (details.length === 0)
      throw new Error("El presupuesto debe tener al menos un detalle");

    if (iva < 0) throw new Error("El IVA no puede ser menor a 0");

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
      sellerId,
    });
  }

  static fromPersistence(budget: IPersistedBudget): Budget {
    return new Budget({
      uuid: EntityId.fromExisting(budget.uuid),
      serie: budget.serie,
      customerId: budget.customerId,
      details: budget.details,
      totalAmount: budget.totalAmount,
      iva: budget.iva,
      createdAt: budget.createdAt,
      status: budget.status,
      approvedAt: budget.approvedAt,
      expiresAt: budget.expiresAt,
      sellerId: budget.sellerId,
    });
  }

  getExpiresAt() {
    return this.expiresAt;
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
  expirate() {
    if (this.isApproved()) {
      throw new Error(
        "El presupuesto ya fue aprobado, no se puede expirar, puedes anular la venta en su lugar.",
      );
    }
    this.status = BudgetStatus.REJECTED;
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
  isExpierd() {
    return this.expiresAt ? this.expiresAt < new Date() : false;
  }

  getAppovedAt() {
    return this.approvedAt;
  }
  getStatus() {
    return this.status;
  }
}

export enum BudgetStatus {
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  PENDING = "PENDING",
  EXPIRED = "EXPIRED",
}
