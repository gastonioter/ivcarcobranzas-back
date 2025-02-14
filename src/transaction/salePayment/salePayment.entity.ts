import { EntityId } from "../../shared/valueObjects/entityId.vo";
import { Entity } from "../../shared/domain/Entity";
import { ISalePayment as PersistedPayment } from "../salePayment/infraestructure/salePayment.schema";

export class SalePayment extends Entity {
  status: SalePaymentStatus;
  amount: number;
  paymentMethod: PaymentMethods;
  createdAt: Date;
  updatedAt?: Date;

  private constructor({
    uuid,
    status,
    amount,
    paymentMethod,
    createdAt,
    updatedAt,
  }: ISalePayment) {
    super(uuid);
    this.status = status;
    this.amount = amount;
    this.paymentMethod = paymentMethod;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static new({
    paymentMethod,
    amount,
  }: Pick<ISalePayment, "amount" | "paymentMethod">): SalePayment {
    if (amount <= 0) {
      throw new Error("El monto ingresado no es valido");
    }

    return new SalePayment({
      uuid: EntityId.create(),
      amount,
      paymentMethod,
      createdAt: new Date(),
      status: SalePaymentStatus.ACTIVE,
    });
  }

  static fromPersistence({
    uuid,
    updatedAt,
    paymentMethod,
    amount,
    status,
    createdAt,
  }: PersistedPayment) {
    return new SalePayment({
      uuid: EntityId.fromExisting(uuid),
      paymentMethod: paymentMethod as PaymentMethods,
      amount,
      status: status as SalePaymentStatus,
      createdAt,
      updatedAt,
    });
  }

  isActive() {
    return this.status == SalePaymentStatus.ACTIVE;
  }
  activate() {
    this.status = SalePaymentStatus.ACTIVE;
    this.setUpdatedAt();
  }

  deactivate() {
    this.status = SalePaymentStatus.CANCELLED;
    this.setUpdatedAt();
  }
  getAmount() {
    return this.amount;
  }
  getMethod() {
    return this.paymentMethod;
  }
  getStatus() {
    return this.status;
  }
  getCreatedAt() {
    return this.createdAt;
  }
  getUpdatedAt() {
    return this.updatedAt;
  }
  private setUpdatedAt() {
    this.updatedAt = new Date();
  }
}

export interface ISalePayment {
  uuid: EntityId;
  status: SalePaymentStatus;
  amount: number;
  paymentMethod: PaymentMethods;
  createdAt: Date;
  updatedAt?: Date;
}

export enum PaymentMethods {
  CASH = "EFECTIVO",
  CARD = "DEBITO/CREDITO",
  TRANSFER = "TRANSFERENCIA BANCARIA",
  CHECK = "CHEQUE",
  MP = "MERCADO PAGO",
  OTHER = "OTRO",
}
export enum SalePaymentStatus {
  ACTIVE = "ACTIVO",
  CANCELLED = "ANULADO",
}
