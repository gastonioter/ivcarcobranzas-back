
// export interface TransactionEntity {
//   uuid: string;
//   serie: string;

//   payments: SalePaymentEntity[];
//   state: TransactionStatus;
//   seller: string;
//   customer: string;
//   totalAmount: number;
//   items: SaleDetailEntity[];
//   createdAt: Date;
//   updatedAt: Date;
//   iva: number;
// }

// export interface SaleDetailEntity {
//   product: string;
//   quantity: number;
//   price: number;
// }

// export enum TransactionType {
//   BUDGET = "BUDGET",
//   SALE = "SALE",
// }

// export enum BudgetStatus {
//   PENDING_APPROVAL = "SUJETO A APROBACION",
//   APPROVED = "APROBADO",
//   REJECTED = "RECHAZADO",
// }

// export enum SaleStatus {
//   PENDING_PAYMENT = "PAGO PENDIENTE",
//   PAID = "PAGO",
//   CANCELLED = "ANULADA",
// }

// export type TransactionStatus =
//   | { type: TransactionType.BUDGET; status: BudgetStatus }
//   | { type: TransactionType.SALE; status: SaleStatus };
