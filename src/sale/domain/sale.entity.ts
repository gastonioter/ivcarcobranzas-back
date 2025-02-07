import { ApprovalPendingState } from "@/transactionStatus/ApprovalPendingState";
import { ApprovedStatus } from "@/transactionStatus/ApprovedStatus";
import { CancelledSale } from "@/transactionStatus/CancelledSale";
import { PaidStatus } from "@/transactionStatus/PaidStatus";
import { PaymentPendingStatus } from "@/transactionStatus/PaymentPendingStatus";
import { RejectedStatus } from "@/transactionStatus/RejectedStatus";

export interface TransactionEntity {
  uuid: string;
  serie: string;
  payments: SalePaymentEntity[];
  status: TransactionStatus;
  seller: string;
  customer: string;
  totalAmount: number;
  items: SaleDetailEntity[];
  createdAt: Date;
  updatedAt: Date;
  iva: number;
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

export enum TransactionType {
  BUDGET = "BUDGET",
  SALE = "SALE",
}

export enum BudgetStatus {
  PENDING_APPROVAL = "SUJETO A APROBACION",
  APPROVED = "APROBADO",
  REJECTED = "RECHAZADO",
}

export enum SaleStatus {
  PENDING_PAYMENT = "PAGO PENDIENTE",
  PAID = "PAGO",
  CANCELLED = "ANULADA",
}

export type TransactionStatus =
  | { type: TransactionType.BUDGET; status: BudgetStatus }
  | { type: TransactionType.SALE; status: SaleStatus };

export enum SalePaymentStatuses {
  ACTIVE = "ACTIVO",
  CANCELLED = "ANULADO",
}

export enum PaymentMethods {
  CASH = "EFECTIVO",
  CARD = "DEBITO/CREDITO",
  TRANSFER = "TRANSFERENCIA BANCARIA",
  CHECK = "CHEQUE",
  MP = "MERCADO PAGO",
  OTHER = "OTRO",
}
