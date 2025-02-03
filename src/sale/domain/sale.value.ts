import {
  ComprobanteTypes,
  PaymentEntity,
  SaleDetailEntity,
  SaleEntity,
  SaleStatuses,
} from "./sale.entity";
import { v4 as uuid } from "uuid";
import { CreateSaleDTO } from "./sale.validations";
export class SaleValue implements SaleEntity {
  uuid: string;
  serie: string;
  tipoComprobante: ComprobanteTypes;
  payments: PaymentEntity[];
  status: SaleStatuses;
  seller: string;
  customer: string;
  items: SaleDetailEntity[];
  createdAt: Date;
  updatedAt: Date;

  constructor({
    seller,
    customer,
    items,
    serie,
    tipoComprobante,
  }: CreateSaleDTO & { serie: string }) {
    this.seller = seller;
    this.customer = customer;
    this.items = items;
    this.tipoComprobante = tipoComprobante;
    this.uuid = uuid();
    this.serie = serie;
    this.payments = [];
    this.status = SaleStatuses.PENDING;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  private static generateSerie() {
    return Math.random().toString(36).substring(2, 15);
  }

  public calculateTotal() {
    return this.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }
}
