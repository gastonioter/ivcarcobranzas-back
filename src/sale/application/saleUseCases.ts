import { SaleRepository } from "../domain/sale.repository";
import { CreateSaleDTO } from "../domain/sale.validations";
import { SaleValue } from "../domain/sale.value";

export class saleUseCases {
  constructor(private readonly saleRepository: SaleRepository) {}

  async createSale(sale: CreateSaleDTO) {
    const totalSales = await this.saleRepository.getTotalSalesNumber();

    const saleEntity = new SaleValue({
      ...sale,
      serie: `${String(totalSales).padStart(4, "0")}`,
    });

    return this.saleRepository.save(saleEntity);
  }

  async findSale(uuid: string) {
    return this.saleRepository.findById(uuid);
  }

  async listSales() {
    return this.saleRepository.findAll();
  }
}
