import { EntityId } from "../../shared/valueObjects/entityId.vo";
import { Entity } from "../../shared/domain/Entity";

export class SalePayment extends Entity {
  status: PaymentStatus;
  amount: number;
  paymentMethod: PaymentMethods;
  createdAt: Date;

  constructor({
    uuid,
    status,
    amount,
    paymentMethod,
    createdAt,
  }: ISalePayment) {
    super(uuid);
    this.status = status;
    this.amount = amount;
    this.paymentMethod = paymentMethod;
    this.createdAt = createdAt;
  }

  isActive() {
    return this.status == PaymentStatus.ACTIVE;
  }
  activate() {
    this.status = PaymentStatus.ACTIVE;
  }
  deactivate() {
    this.status = PaymentStatus.CANCELLED;
  }
}

export interface ISalePayment {
  uuid: EntityId;
  status: PaymentStatus;
  amount: number;
  paymentMethod: PaymentMethods;
  createdAt: Date;
}

export enum PaymentMethods {
  CASH = "EFECTIVO",
  CARD = "DEBITO/CREDITO",
  TRANSFER = "TRANSFERENCIA BANCARIA",
  CHECK = "CHEQUE",
  MP = "MERCADO PAGO",
  OTHER = "OTRO",
}
export enum PaymentStatus {
  ACTIVE = "ACTIVO",
  CANCELLED = "ANULADO",
}
