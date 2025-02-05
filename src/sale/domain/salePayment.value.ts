import {
  PaymentMethods,
  SalePaymentEntity,
  SalePaymentStatuses,
} from "./sale.entity";
import { v4 as uuid } from "uuid";
import { AddPaymentRequestType } from "./sale.validations";

export class SalePaymentValue implements SalePaymentEntity {
  uuid: string;
  amount: number;
  paymentMethod: PaymentMethods;
  createdAt: Date;
  status: SalePaymentStatuses;

  constructor({ amount, paymentMethod }: AddPaymentRequestType) {
    this.uuid = uuid();
    this.status = SalePaymentStatuses.ACTIVE;
    this.amount = amount;
    this.paymentMethod = paymentMethod;
    this.createdAt = new Date();
  }
}
