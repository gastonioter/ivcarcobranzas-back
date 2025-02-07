import { v4 as uuid } from "uuid";
import {
  SalePaymentEntity,
  SaleDetailEntity,
  TransactionEntity,
  SaleStatus,
  TransactionStatus,
  TransactionType,
  BudgetStatus,
} from "./sale.entity";
import { CreateSaleRequestType } from "./sale.validations";

export class SaleValue implements TransactionEntity {
  uuid: string;
  serie: string;
  payments: SalePaymentEntity[];
  status: TransactionStatus;
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
    isBudget = false,
  }: CreateSaleRequestType & { serie: string }) {
    this.seller = seller;
    this.customer = customer;
    this.items = items;
    this.uuid = uuid();
    this.serie = serie;
    this.iva = iva;
    this.payments = [];
    this.status = this.getStatus(isBudget);
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.totalAmount = this.calculateTotal();
  }

  private getStatus(isBudget: boolean): TransactionStatus {
    if (isBudget) {
      return {
        type: TransactionType.BUDGET,
        status: BudgetStatus.PENDING_APPROVAL,
      };
    } else {
      return {
        type: TransactionType.SALE,
        status: SaleStatus.PENDING_PAYMENT,
      };
    }
  }
  private calculateTotal() {
    return this.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }
}
