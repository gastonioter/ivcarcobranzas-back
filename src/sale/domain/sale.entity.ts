export interface SaleEntity {
  uuid: string;
  serie: string;
  payments: SalePaymentEntity[];
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

export interface SalePaymentEntity {
  uuid: string;
  status: SalePaymentStatuses;
  amount: number;
  paymentMethod: PaymentMethods;
  createdAt: Date;
}

export enum SalePaymentStatuses {
  ACTIVE = "ACTIVO",
  CANCELLED = "ANULADO",
}

export enum SaleStatuses {
  PENDING = "PENDIENTE",
  PAID = "PAGO",
  CANCELLED = "ANULADA",
}

export enum PaymentMethods {
  CASH = "EFECTIVO",
  CARD = "DEBITO/CREDITO",
  TRANSFER = "TRANSFERENCIA BANCARIA",
  CHECK = "CHEQUE",
  MP = "MERCADO PAGO",
  OTHER = "OTRO",
}
