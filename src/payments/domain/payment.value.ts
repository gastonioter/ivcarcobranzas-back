import { PaymentDetailItem, PaymentEntity } from "./payment.entity";
import { v4 as uuid } from "uuid";
import { CreatePaymentRequest } from "./payment.validations";

export class PaymentValue implements PaymentEntity {
  uuid: string;
  customer: string;
  detail: PaymentDetailItem[];
  createdAt: Date;

  constructor({ customer, detail }: CreatePaymentRequest) {
    this.uuid = uuid();
    this.customer = customer;
    this.detail = detail;
    this.createdAt = new Date();
  }
}
