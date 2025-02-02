import { SaleEntity } from "@/sale/domain/sale.entity";
import { SaleRepository } from "@/sale/domain/sale.repository";
import { SaleModel } from "../models/sale.schema";

export class SalesMongoRepository implements SaleRepository {
  async save(sale: SaleEntity): Promise<SaleEntity | null> {
    const saleDoc = await SaleModel.create(sale);

    return saleDoc;
  }

  async findById(uuid: string): Promise<SaleEntity | null> {
    const sale = await SaleModel.findOne({ uuid });
    
    return sale;
  }
  async getTotalSalesNumber(): Promise<number> {
    return SaleModel.countDocuments();
  }
  async findAll(): Promise<SaleEntity[]> {
    const sales = await SaleModel.find({});

    return sales;
  }
}
