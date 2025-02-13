import { CustomerEntity } from "../../customer/domain/customer.entity";
import { Entity } from "../../shared/domain/Entity";
import { EntityId } from "../../shared/valueObjects/entityId.vo";

export abstract class Transaction extends Entity {
  constructor(
    uuid: EntityId,
    protected serie: string,
    protected customerId: string,
    protected details: Detail[],
    protected totalAmount: number,
    protected iva: number,
    protected createdAt: Date,
    protected sellerId: string,
  ) {
    super(uuid);
  }

  getCustomerId() {
    return this.customerId;
  }
  getSerie() {
    return this.serie;
  }
  getCreatedAt() {
    return this.createdAt;
  }
  getIva() {
    return this.iva;
  }
  getDetails() {
    return this.details;
  }
  getSellerId() {
    return this.sellerId;
  }
  getTotalAmount() {
    return this.totalAmount;
  }
  static computeTotalAmount(details: Detail[]) {
    return details.reduce(
      (acc, detail) => acc + detail.unitPrice * detail.quantity,
      0,
    );
  }
  static generateSerie() {
    return `S${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`;
  }
}

export interface Detail {
  product: string;
  quantity: number;
  unitPrice: number;
}

export interface ITransaction {
  uuid: EntityId;
  serie: string;
  sellerId: string;
  details: Detail[]; // value object
  totalAmount: number;
  customerId: string;
  createdAt: Date;
  iva: number;
}
