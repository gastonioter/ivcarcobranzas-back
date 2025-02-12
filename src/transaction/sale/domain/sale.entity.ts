import { ITransaction, Transaction } from "../../Transaction";
import { EntityId } from "../../../shared/valueObjects/entityId.vo";
import { UserEntity } from "../../../user/domain/user.entity";
import { SalePayment } from "../../../transaction/salePayment/salePayment.entity";

export class Sale extends Transaction {
  private seller: UserEntity;
  private payments: SalePayment[];
  private status: SaleStatus;

  constructor({
    uuid,
    createdAt,
    customer,
    payments,
    seller,
    serie,
    status,
    details,
    totalAmount,
  }: ISale) {
    super({ uuid, createdAt, customer, serie, details, totalAmount });
    this.payments = payments;
    this.status = status;
    this.seller = seller;
    this.details = details;
    this.totalAmount = totalAmount;
  }

  isPaid() {
    return this.status == SaleStatus.PAID;
  }

  getSeller() {
    return this.seller;
  }

  isCancelled() {
    return this.status == SaleStatus.CANCELLED;
  }
  isAnnulled() {
    return this.status == SaleStatus.ANNULLED;
  }
  getPayments() {
    return this.payments;
  }
  getSaldo() {
    return this.totalAmount - this.getTotalPaid();
  }
  getTotalPaid() {
    return this.payments.reduce((acc, payment) => {
      if (payment.isActive()) {
        return acc + payment.amount;
      }
      return acc;
    }, 0);
  }
  addPayment(payment: SalePayment) {
    if (!this.isPaid()) {
      this.payments.push(payment);
    }
    throw new Error("La venta ya fue pagada");
  }
}

interface ISale extends ITransaction {
  uuid: EntityId;
  payments: SalePayment[];
  seller: UserEntity;
  status: SaleStatus;
}

enum SaleStatus {
  PAID = "PAID",
  CANCELLED = "CANCELLED",
  ANNULLED = "ANNULLED",
}
