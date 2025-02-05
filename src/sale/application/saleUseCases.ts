import { generateSecuence } from "../../shared/utils/generateSecuence";
import { SaleRepository } from "../domain/sale.repository";
import {
  AddPaymentSchema,
  CreateSaleDTO,
  UpdateSaleStatusRequest,
} from "../domain/sale.validations";
import { SaleValue } from "../domain/sale.value";

export class saleUseCases {
  constructor(private readonly saleRepository: SaleRepository) {}

  async createSale(sale: CreateSaleDTO) {
    const totalSales = await this.saleRepository.getTotalSalesNumber();

    const saleEntity = new SaleValue({
      ...sale,
      serie: generateSecuence(totalSales),
    });

    return this.saleRepository.save(saleEntity);
  }

  async addPayment(uuid: string, payment: AddPaymentSchema) {
    return this.saleRepository.addPayment(uuid, {
      ...payment,
      createdAt: new Date(),
    });
  }

  async changeStatus({ uuid, status }: UpdateSaleStatusRequest) {
    return this.saleRepository.changeStatus({ uuid, status });
  }

  async findSale(uuid: string) {
    return this.saleRepository.findById(uuid);
  }

  async listSales() {
    return this.saleRepository.findAll();
  }
}
