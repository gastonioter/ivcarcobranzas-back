export interface SaleEntity {
  uuid: string;
  serie: string;
  payments: PaymentEntity[];
  status: SaleStatuses;
  seller: string;
  customer: string;
  totalAmount: number;
  items: SaleDetailEntity[];
  createdAt: Date;
  iva: number;
  updatedAt: Date;
}

export interface SaleDetailEntity {
  product: string;
  quantity: number;
  price: number;
}

export enum SaleStatuses {
  PENDING = "PENDIENTE",
  PAID = "PAGO",
  CANCELLED = "ANULADA",
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
