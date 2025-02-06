import { InvalidOperationError } from "../../shared/domain/exceptions";
import { generateSecuence } from "../../shared/utils/generateSecuence";
import {
  SaleEntity,
  SalePaymentStatuses,
  SaleStatuses,
} from "../domain/sale.entity";
import { SaleRepository } from "../domain/sale.repository";
import {
  AddPaymentRequestType,
  CreateSaleRequestType,
  UpdateSalePaymentStatusRequestType,
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

  async createSale(sale: CreateSaleRequestType) {
    const totalSales = await this.saleRepository.getTotalSalesNumber();

    const saleEntity = new SaleValue({
      ...sale,
      serie: generateSecuence(totalSales),
    });

    return this.saleRepository.save(saleEntity);
  }

  async addPayment(saleID: string, payment: AddPaymentRequestType) {
    const sale = await this.saleRepository.findById(saleID);
    if (sale?.status == SaleStatuses.CANCELLED) {
      throw new InvalidOperationError(
        "No puedes agregar pagos a una venta cancelada"
      );
    }
    const paymentValue = new SalePaymentValue(payment);

    const updatedPayment = await this.saleRepository.addPayment(
      saleID,
      paymentValue
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
    return this.saleRepository.changeStatus({ uuid, status });
  }

  async findSale(uuid: string) {
    return this.saleRepository.findById(uuid);
  }

  async listSales() {
    return this.saleRepository.findAll();
  }

  /* PRIVATE METHODS */
  private async _updateSaleStatus(sale: SaleEntity) {
    if (sale.status == SaleStatuses.CANCELLED) {
      return sale;
    }
    const saldo = this.computeSaleSummary(sale);
    const isPaid = saldo <= 0;

    if (isPaid) {
      return await this.saleRepository.changeStatus({
        uuid: sale.uuid,
        status: SaleStatuses.PAID,
      });
    }

    return sale;
  }

  private computeSaleSummary(sale: SaleEntity) {
    const debe = sale.totalAmount;
    const haber = sale.payments.reduce(
      (acc, payment) =>
        payment.status == SalePaymentStatuses.ACTIVE
          ? acc + payment.amount
          : acc,
      0
    );

    const saldo = debe - haber;
    return saldo;
  }
}
