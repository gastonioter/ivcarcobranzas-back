import { CustomerEntity } from "@/customer/domain/customer.entity";
import { Entity } from "@/shared/domain/Entity";
import { EntityId } from "@/shared/valueObjects/entityId.vo";
import { UserEntity } from "@/user/domain/user.entity";

interface ITransaction {
  uuid:EntityId;
  serie:string;
  customer:CustomerEntity;
  createdAt:Date;
}
abstract class Transaction extends Entity {
  protected serie: string;
  protected customer: CustomerEntity;
  protected createdAt: Date;

  constructor({uuid, serie, customer,createdAt}:ITransaction){
    super(uuid);
    this.createdAt = createdAt;
    this.customer = customer;
    this.serie = serie
  }
}

interface ISale extends ITransaction {
  uuid: EntityId;
  payments: Payments[];
  seller: UserEntity;
  status: SaleStatus;
}

export class Sale extends Transaction {
  private seller: UserEntity;
  private payments: Payments[];
  private status: SaleStatus;

  constructor({uuid,createdAt,customer,payments,seller,serie,status}: ISale) {
    super({uuid,createdAt,customer,serie});
    this.payments = payments;
    this.status = status;
    this.seller = seller;
  }
}
interface 
export class Budget extends Transaction{

}
// export interface TransactionEntity {
//   uuid: string;
//   serie: string;

//   payments: SalePaymentEntity[];
//   status: TransactionStatus;
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

// export interface SalePaymentEntity {
//   uuid: string;
//   status: SalePaymentStatuses;
//   amount: number;
//   paymentMethod: PaymentMethods;
//   createdAt: Date;
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

// export enum SalePaymentStatuses {
//   ACTIVE = "ACTIVO",
//   CANCELLED = "ANULADO",
// }

// export enum PaymentMethods {
//   CASH = "EFECTIVO",
//   CARD = "DEBITO/CREDITO",
//   TRANSFER = "TRANSFERENCIA BANCARIA",
//   CHECK = "CHEQUE",
//   MP = "MERCADO PAGO",
//   OTHER = "OTRO",
// }
