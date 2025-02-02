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
  uuid: string;
  product: string;
  quantity: number;
  price: number;
}

export enum SaleStatuses {
  PENDING = "PENDING",
  PAID = "PAID",
  CANCELLED = "CANCELLED",
}

export interface PaymentEntity {
  uuid: string;
  amount: number;
  paymentMethod: string;
  createdAt: Date;
}
