import { generateSecuence } from "../../shared/utils/generateSecuence";
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
    const paymentValue = new SalePaymentValue(payment);

    return this.saleRepository.addPayment(saleID, paymentValue);
  }

  async getPayments(saleID: string) {
    return this.saleRepository.getPayments(saleID);
  }

  async updatePaymentStatus({
    saleID,
    paymentID,
    status,
  }: UpdateSalePaymentStatusArgs) {
    return this.saleRepository.updatePaymentStatus({
      saleID,
      paymentID,
      status,
    });
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
}
