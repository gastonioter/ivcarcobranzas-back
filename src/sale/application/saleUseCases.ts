import { InvalidOperationError } from "../../shared/domain/exceptions";
import { generateSecuence } from "../../shared/utils/generateSecuence";
import { PaidStatus } from "../../transactionStatus/PaidStatus";
import { PaymentPendingStatus } from "../../transactionStatus/PaymentPendingStatus";
import {
  BudgetStatus,
  SalePaymentStatuses,
  SaleStatus,
  TransactionEntity,
  TransactionStatus,
  TransactionType,
} from "../domain/sale.entity";
import { SaleNotFoundError } from "../domain/sale.exceptions";
import { SaleRepository } from "../domain/sale.repository";
import {
  AddPaymentRequestType,
  CreateSaleRequestType,
  UpdateSaleStatusRequestType,
} from "../domain/sale.validations";
import { SaleValue } from "../domain/sale.value";
import { SalePaymentValue } from "../domain/salePayment.value";
interface UpdateSalePaymentStatusArgs {
  saleID: string;
  paymentID: string;
  status: string;
}
export class SaleUseCases {
  constructor(private readonly saleRepository: SaleRepository) {}

  async createTransaction(sale: CreateSaleRequestType) {
    const totalSales = await this.saleRepository.getTotalSalesNumber();

    const TransactionEntity = new SaleValue({
      ...sale,
      serie: generateSecuence(totalSales),
    });

    return this.saleRepository.save(TransactionEntity);
  }

  async addPayment(saleID: string, payment: AddPaymentRequestType) {
    const sale = await this.saleRepository.findById(saleID);
    if (!sale) {
      throw new SaleNotFoundError(saleID);
    }
    if (
      sale.status.type == TransactionType.SALE &&
      sale.status.status == SaleStatus.CANCELLED
    ) {
      throw new InvalidOperationError(
        "No puedes agregar pagos a una venta cancelada",
      );
    }

    if (
      sale.status.type == TransactionType.BUDGET &&
      sale.status.status !== BudgetStatus.APPROVED
    ) {
      throw new InvalidOperationError(
        "No puedes agregar pagos a un presupuesto sin aprobar",
      );
    }
    const paymentValue = new SalePaymentValue(payment);

    const updatedPayment = await this.saleRepository.addPayment(
      saleID,
      paymentValue,
    );

    return this._updateSaleStatus(updatedPayment);
  }

  async getPayments(saleID: string) {
    return this.saleRepository.getPayments(saleID);
  }

  async updatePaymentStatus({
    saleID,
    paymentID,
    status,
  }: UpdateSalePaymentStatusArgs) {
    const payment = await this.saleRepository.updatePaymentStatus({
      saleID,
      paymentID,
      status,
    });

    return this._updateSaleStatus(payment);
  }

  async changeStatus({ uuid, status }: UpdateSaleStatusRequestType) {
    const sale = await this.saleRepository.findById(uuid);

    if (!sale) {
      throw new SaleNotFoundError(uuid);
    }

    /* TRANSICIONES ENTRE ESTADOS NO VALIDAS */

    if (
      sale.status.type == TransactionType.SALE &&
      Object.values(BudgetStatus).includes(status as BudgetStatus)
    ) {
      throw new InvalidOperationError(
        `Una venta no puede cambiar su estado a ${status}`,
      );
    }

    if (
      sale.status.type == TransactionType.BUDGET &&
      Object.values(SaleStatus).includes(status as SaleStatus)
    ) {
      throw new InvalidOperationError(
        `Un presupuesto no puede cambiar su estado a ${status}`,
      );
    }

    /* BUDGET REJECTED ES UN ESTADO FINAL */

    if (
      sale.status.type == TransactionType.BUDGET &&
      sale.status.status == BudgetStatus.REJECTED
    ) {
      throw new InvalidOperationError(`El presupuesto ya fue rechazado`);
    }

    /* CANCELLED SALE ES UN ESTADO FINAL */

    // if (
    //   sale.status.type == TransactionType.SALE &&
    //   sale.status.status == SaleStatus.CANCELLED
    // ) {
    //   throw new InvalidOperationError(`La venta ya fue cancelada`);
    // }

    // const validTransitions = {
    //   [TransactionType.BUDGET]: [
    //     BudgetStatus.PENDING_APPROVAL,
    //     BudgetStatus.APPROVED,
    //     BudgetStatus.REJECTED,
    //   ],
    //   [TransactionType.SALE]: [
    //     SaleStatus.PENDING_PAYMENT,
    //     SaleStatus.PAID,
    //     SaleStatus.CANCELLED,
    //   ],
    // };

    // if (!validTransitions[sale.status.type].includes(status)) {
    //   throw new InvalidOperationError(
    //     `No puedes cambiar el estado a ${status}`
    //   );
    // }
    let newStatus: TransactionStatus = {} as TransactionStatus;

    if (sale.status.type == TransactionType.SALE) {
      newStatus = {
        status: status as SaleStatus,
        type: sale.status.type,
      };
    } else {
      newStatus = {
        status: status as BudgetStatus,
        type: sale.status.type,
      };
    }

    /* SI SE QUIERE APROBAR UN PRESUPUESTO, PASA AUTOMATICAMENTE A SER UNA VENTA EN ESTADO PENDIENTE DE PAGO */
    if (
      sale.status.type == TransactionType.BUDGET &&
      status == BudgetStatus.APPROVED
    ) {
      newStatus = {
        status: SaleStatus.PENDING_PAYMENT,
        type: TransactionType.SALE,
      };
    }

    return await this.saleRepository.changeStatus({ uuid, status: newStatus });
  }

  async findSale(uuid: string) {
    return this.saleRepository.findById(uuid);
  }

  async listSales() {
    return this.saleRepository.findAll();
  }

  /* PRIVATE METHODS */
  private async _updateSaleStatus(sale: TransactionEntity) {
    /* Calcula el resumen de venta (debe-haber-saldo) y actualiza el estado de la misma a "PENDIENTE DE PAGO" o "PAGO" 
    
    Se ejecuta cada vez que se crea un pago o se actualiza es estado de alguno de ellos*/

    if (
      sale.status.type === TransactionType.BUDGET &&
      sale.status.status !== BudgetStatus.APPROVED
    ) {
      return sale;
    }

    const saldo = this.computeSaleSummary(sale);
    const isPaid = saldo <= 0;

    if (isPaid) {
      return await this.saleRepository.changeStatus({
        uuid: sale.uuid,
        status: new PaidStatus(),
      });
    } else {
      return await this.saleRepository.changeStatus({
        uuid: sale.uuid,
        status: new PaymentPendingStatus(),
      });
    }

    return sale;
  }

  private computeSaleSummary(sale: TransactionEntity) {
    const debe = sale.totalAmount;
    const haber = sale.payments.reduce(
      (acc, payment) =>
        payment.status == SalePaymentStatuses.ACTIVE
          ? acc + payment.amount
          : acc,
      0,
    );

    const saldo = debe - haber;
    return saldo;
  }
}
