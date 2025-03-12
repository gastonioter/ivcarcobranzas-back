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
    approvedAt,
    iva,
    expiresAt,
    sellerId,
  }: IBudget) {
    super(uuid, serie, customerId, details, iva, createdAt, sellerId);
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
    semilla,
  }: {
    customerId: string;
    details: Detail[];
    iva: number;
    expiresAt?: Date;
    sellerId: string;
    semilla: number;
  }): Budget {
    if (expiresAt && expiresAt < new Date())
      throw new Error(
        "La fecha de expiración no puede ser menor a la fecha actual",
      );

    if (details.length === 0)
      throw new Error("El presupuesto debe tener al menos un detalle");

    if (iva < 0) throw new Error("El IVA no puede ser menor a 0");

    //const totalAmount = this.computeTotalAmount(details);
    const createdAt = new Date();
    const serie = `PTO-${Transaction.generateSerie(semilla)}`;
    const uuid = EntityId.create();
    const status = BudgetStatus.PENDING;
    return new Budget({
      uuid,
      createdAt,
      status,
      customerId,
      details,
      iva,
      serie,
      expiresAt,
      sellerId,
    });
  }

  getExpiresAt() {
    return this.expiresAt;
  }

  approve() {
    if (this.isRejected()) {
      throw new Error("El presupuesto ya fue rechazado, no se puede aprobar");
    }
    if (this.isExpierd()) {
      throw new Error("El presupuesto ya expiró, no se puede aprobar");
    }

    if (this.isApproved()) {
      throw new Error("El presupuesto ya esta aprobado");
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

  getApprovedAt() {
    return this.approvedAt;
  }
  getStatus() {
    return this.status;
  }

  static fromPersistence(budget: IPersistedBudget): Budget {
    return new Budget({
      uuid: EntityId.fromExisting(budget.uuid),
      serie: budget.serie,
      customerId: budget.customerId,
      details: budget.details,
      iva: budget.iva,
      createdAt: budget.createdAt,
      status: budget.status,
      approvedAt: budget.approvedAt,
      expiresAt: budget.expiresAt,
      sellerId: budget.sellerId,
    });
  }
}

export enum BudgetStatus {
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  PENDING = "PENDING",
  EXPIRED = "EXPIRED",
}
