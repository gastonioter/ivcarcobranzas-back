import { EntityId } from "../../shared/valueObjects/entityId.vo";
import { Entity } from "../../shared/domain/Entity";
import { ISalePayment as PersistedPayment } from "../sale/infraestructure/sale.schema";

export class SalePayment extends Entity {
  status: SalePaymentStatus;
  amount: number;
  paymentMethod: PaymentMethods;
  createdAt: Date;

  private constructor({
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
    });
  }

  isActive() {
    return this.status == SalePaymentStatus.ACTIVE;
  }
  activate() {
    this.status = SalePaymentStatus.ACTIVE;
  }
  deactivate() {
    this.status = SalePaymentStatus.CANCELLED;
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
}

export interface ISalePayment {
  uuid: EntityId;
  status: SalePaymentStatus;
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
export enum SalePaymentStatus {
  ACTIVE = "ACTIVO",
  CANCELLED = "ANULADO",
}
