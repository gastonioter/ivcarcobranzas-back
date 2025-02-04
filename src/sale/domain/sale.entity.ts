export interface SaleEntity {
  uuid: string;
  serie: string;
  payments: PaymentEntity[];
  status: SaleStatuses;
  seller: string;
  customer: string;
  items: SaleDetailEntity[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SaleDetailEntity {
  product: string;
  quantity: number;
  price: number;
}

export enum SaleStatuses {
  PENDING = "PENDING",
  PAID = "PAID",
  CANCELLED = "CANCELLED",
}
export enum PaymentMethods {
  CASH = "CASH",
  CARD = "CARD",
  TRANSFER = "TRANSFER",
}

export interface PaymentEntity {
  amount: number;
  paymentMethod: PaymentMethods;
  createdAt: Date;
}
