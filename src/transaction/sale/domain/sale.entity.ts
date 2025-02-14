import { EntityId } from "../../../shared/valueObjects/entityId.vo";
import { SalePayment } from "../../../transaction/salePayment/salePayment.entity";
import { Detail, ITransaction, Transaction } from "../../domain/Transaction";
import { ISale as IPersistedSale } from "../infraestructure/sale.schema";
import { ITransaction as IPersistedTransaction } from "../../infraestructure/transaction.schema";
import { InvalidOperationError } from "../../../shared/domain/exceptions";

export class Sale extends Transaction {
  private payments: SalePayment[];
  private status: SaleStatus;
  private budgetId?: string;

  private constructor({
    uuid,
    createdAt,
    customerId,
    payments,
    sellerId,
    serie,
    status,
    details,

    iva,
    budgetId,
  }: ISale) {
    super(
      uuid,
      serie,
      customerId,
      details,

      iva,
      createdAt,
      sellerId,
    );
    this.payments = payments;
    this.status = status;

    this.budgetId = budgetId;
  }

  static new({
    customerId,
    details,
    iva,
    sellerId,
    budgetId,
  }: {
    customerId: string;
    details: Detail[];
    iva: number;
    sellerId: string;
    budgetId?: string;
  }): Sale {
    //const totalAmount = Transaction.computeTotalAmount(details);
    const createdAt = new Date();
    const payments = [] as SalePayment[];
    const serie = Transaction.generateSerie();
    const uuid = EntityId.create();
    const status = SaleStatus.PENDING;

    return new Sale({
      uuid,
      createdAt,
      status,
      customerId,
      details,
      iva,
      payments,
      sellerId,
      serie,
      budgetId,
    });
  }

  static fromPersistence({
    createdAt,
    customerId,
    details,
    payments,
    sellerId,
    serie,
    status,
    uuid,
    iva,
    budgetId,
  }: IPersistedSale & IPersistedTransaction): Sale {
    return new Sale({
      uuid: EntityId.fromExisting(uuid),
      createdAt,
      customerId,
      details,
      payments: payments.map(SalePayment.fromPersistence),
      sellerId,
      serie,
      status: status as SaleStatus,
      iva,
      budgetId,
    });
  }

  isPaid() {
    return this.status == SaleStatus.PAID;
  }

  comesFromBudget() {
    return this.budgetId;
  }

  private pay() {
    this.status = SaleStatus.PAID;
  }
  private markAsPending() {
    this.status = SaleStatus.PENDING;
  }
  cancel() {
    this.status = SaleStatus.CANCELLED;
  }
  activate() {
    const saldo = this.getSaldo();
    if (saldo <= 0) {
      this.pay();
    } else {
      this.markAsPending();
    }
  }

  isCancelled() {
    return this.status == SaleStatus.CANCELLED;
  }
  isPending() {
    return this.status == SaleStatus.PENDING;
  }

  getPayments() {
    return this.payments;
  }
  getSaldo() {
    return this.totalAmount - this.getTotalPaid();
  }
  checkIfPaid() {
    console.log("checkingggg....");
    if (this.getSaldo() <= 0) {
      this.pay();
    } else {
      this.markAsPending();
    }
  }
  getTotalPaid() {
    return this.payments.reduce((acc, payment) => {
      if (payment.isActive()) {
        return acc + payment.amount;
      }
      return acc;
    }, 0);
  }

  getStatus() {
    return this.status;
  }
  getBudgetId() {
    return this.budgetId;
  }

  addPayment(payment: SalePayment) {
    if (this.isPaid()) {
      throw new InvalidOperationError(
        "No puedes agregar pagos a una venta pagada",
      );
    }
    if (this.isCancelled()) {
      throw new Error("No puedes agregar pagos a una venta cancelada");
    }
    this.payments.push(payment);
    if (this.getSaldo() <= 0) {
      this.pay();
    }
  }
}

interface ISale extends ITransaction {
  payments: SalePayment[];
  sellerId: string;
  status: SaleStatus;
  budgetId?: string;
}

export enum SaleStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  CANCELLED = "CANCELLED",
}
