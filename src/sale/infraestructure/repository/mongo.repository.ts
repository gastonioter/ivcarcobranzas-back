import { PaymentEntity, SaleEntity } from "@/sale/domain/sale.entity";
import { SaleRepository } from "@/sale/domain/sale.repository";
import { SaleDoc, SaleModel } from "../models/sale.schema";

export class SalesMongoRepository implements SaleRepository {
  async save(sale: SaleEntity): Promise<SaleEntity | null> {
    const saleDoc = await SaleModel.create(sale);

    return this._saleDTO(saleDoc);
  }

  async findById(uuid: string): Promise<SaleEntity | null> {
    const sale = await SaleModel.findOne({ uuid });
    if (!sale) {
      return null;
    }

    return this._saleDTO(sale);
  }

  async addPayment(
    uuid: string,
    newPayment: PaymentEntity
  ): Promise<SaleEntity | null> {
    const updatedSale = await SaleModel.findOneAndUpdate(
      { uuid },
      { $push: { payments: newPayment } },
      {
        new: true,
      }
    );
    if (!updatedSale) {
      return null;
    }

    return this._saleDTO(updatedSale);
  }
  async getTotalSalesNumber(): Promise<number> {
    return SaleModel.countDocuments();
  }
  async findAll(): Promise<SaleEntity[]> {
    const sales = await SaleModel.find({});

    return sales;
  }

  private _saleDTO = (mongooseDoc: SaleDoc) => {
    return {
      uuid: mongooseDoc.uuid,
      seller: mongooseDoc.seller,
      customer: mongooseDoc.customer,
      serie: mongooseDoc.serie,
      status: mongooseDoc.status,
      items: mongooseDoc.items,
      payments: mongooseDoc.payments,
      createdAt: mongooseDoc.createdAt,
      updatedAt: mongooseDoc.updatedAt,
    };
  };
}
