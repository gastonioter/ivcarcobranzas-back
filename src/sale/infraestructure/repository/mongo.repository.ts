import { PaymentEntity, SaleEntity } from "@/sale/domain/sale.entity";
import { SaleRepository } from "@/sale/domain/sale.repository";
import { SaleDoc, SaleModel } from "../models/sale.schema";
import {
  mapSaleDetailDTO,
  SaleDetailsDTO,
  saleDTO,
  SaleDTO,
} from "../../domain/sale.dto";
import { UserEntity } from "@/user/domain/user.entity";
import { CustomerEntity } from "@/customer/domain/customer.entity";
import { SaleNotFoundError } from "../../domain/sale.exceptions";
import { UpdateSaleStatusRequest } from "@/sale/domain/sale.validations";

export class SalesMongoRepository implements SaleRepository {
  async save(sale: SaleEntity): Promise<SaleEntity | null> {
    const saleDoc = await SaleModel.create(sale);
    return saleDoc;
  }

  async findById(uuid: string): Promise<SaleDetailsDTO | null> {
    const sale = await SaleModel.findOne({ uuid }).populate<{
      customer: CustomerEntity;
    }>("customerData");
    if (!sale) {
      throw new SaleNotFoundError(uuid);
    }
    return mapSaleDetailDTO(sale);
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

  async changeStatus({
    uuid,
    status,
  }: UpdateSaleStatusRequest): Promise<SaleEntity | null> {
    const updatedSale = await SaleModel.findOneAndUpdate(
      { uuid },
      { status },
      {
        new: true,
      }
    );
    if (!updatedSale) {
      return null;
    }

    return this._saleDTO(updatedSale);
  }
  async findAll(): Promise<SaleDTO[]> {
    const sales = await SaleModel.find({})
      .populate<{ sellerData: UserEntity }>("sellerData")
      .populate<{ customerData: CustomerEntity }>("customerData");

    return sales.map(saleDTO);
  }

  private _saleDTO = (mongooseDoc: SaleDoc) => {
    return {
      uuid: mongooseDoc.uuid,
      seller: mongooseDoc.seller,
      customer: mongooseDoc.customer,
      serie: mongooseDoc.serie,
      status: mongooseDoc.status,
      items: mongooseDoc.items,
      totalAmount: mongooseDoc.totalAmount,
      payments: mongooseDoc.payments,
      createdAt: mongooseDoc.createdAt,
      updatedAt: mongooseDoc.updatedAt,
      iva: mongooseDoc.iva,
    };
  };
}
