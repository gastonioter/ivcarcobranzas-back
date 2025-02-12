import { CustomerEntity } from "../customer/domain/customer.entity";
import { Entity } from "../shared/domain/Entity";
import { EntityId } from "../shared/valueObjects/entityId.vo";

export abstract class Transaction extends Entity {
  protected serie: string;
  protected customer: CustomerEntity;
  protected createdAt: Date;
  protected details: Detail[];
  protected totalAmount: number;

  constructor({
    uuid,
    serie,
    customer,
    createdAt,
    details,
    totalAmount,
  }: ITransaction) {
    super(uuid);
    this.createdAt = createdAt;
    this.customer = customer;
    this.serie = serie;
    this.details = details;
    this.totalAmount = totalAmount;
  }

  getCustomer() {
    return this.customer;
  }
  getSerie() {
    return this.serie;
  }
  getCreatedAt() {
    return this.createdAt;
  }
}

export interface Detail {
  product: string;
  quantity: number;
  price: number;
}

export interface ITransaction {
  uuid: EntityId;
  serie: string;
  details: Detail[]; // value object
  totalAmount: number;
  customer: CustomerEntity;
  createdAt: Date;
}
