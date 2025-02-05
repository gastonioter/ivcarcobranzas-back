import { v4 as uuid } from "uuid";
import {
  SalePaymentEntity,
  SaleDetailEntity,
  SaleEntity,
  SaleStatuses,
} from "./sale.entity";
import { CreateSaleRequestType } from "./sale.validations";

export class SaleValue implements SaleEntity {
  uuid: string;
  serie: string;
  payments: SalePaymentEntity[];
  status: SaleStatuses;
  seller: string;
  customer: string;
  items: SaleDetailEntity[];
  iva: number;
  createdAt: Date;
  updatedAt: Date;
  totalAmount: number;

  constructor({
    seller,
    customer,
    items,
    serie,
    iva,
  }: CreateSaleRequestType & { serie: string }) {
    this.seller = seller;
    this.customer = customer;
    this.items = items;
    this.uuid = uuid();
    this.serie = serie;
    this.iva = iva;
    this.payments = [];
    this.status = SaleStatuses.PENDING;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.totalAmount = this.calculateTotal();
  }

  public calculateTotal() {
    return this.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }
}
