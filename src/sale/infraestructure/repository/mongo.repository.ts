import { CustomerEntity } from "@/customer/domain/customer.entity";
import {
  SalePaymentEntity,
  TransactionEntity,
  TransactionStatus,
} from "@/sale/domain/sale.entity";
import { SaleRepository } from "@/sale/domain/sale.repository";
import { UserEntity } from "@/user/domain/user.entity";
import { saleDTO, SaleDTO } from "../../domain/sale.dto";
import { SaleNotFoundError } from "../../domain/sale.exceptions";
import { SaleDoc, SaleModel } from "../models/sale.schema";

export class SalesMongoRepository implements SaleRepository {
  async updatePaymentStatus({
    saleID,
    paymentID,
    status,
  }: {
    saleID: string;
    paymentID: string;
    status: string;
  }): Promise<TransactionEntity> {
    const updatedSale = await SaleModel.findOneAndUpdate(
      {
        uuid: saleID,
        // "payments.uuid": paymentID,
      },
      {
        $set: {
          "payments.$[elem].status": status,
        },
      },
      {
        arrayFilters: [{ "elem.uuid": paymentID }],
        new: true,
      },
    );

    if (!updatedSale) {
      throw new SaleNotFoundError(saleID);
    }

    return this._saleDTO(updatedSale);
  }

  async addPayment(
    uuid: string,
    newPayment: SalePaymentEntity,
  ): Promise<TransactionEntity> {
    const updatedSale = await SaleModel.findOneAndUpdate(
      { uuid },
      { $push: { payments: newPayment } },
      {
        new: true,
      },
    );
    if (!updatedSale) {
      throw new SaleNotFoundError(uuid);
    }

    return this._saleDTO(updatedSale);
  }
  async save(sale: TransactionEntity): Promise<TransactionEntity | null> {
    const saleDoc = await SaleModel.create(sale);

    return saleDoc;
  }

  async findById(uuid: string): Promise<SaleDTO | null> {
    const sale = await SaleModel.findOne({ uuid })
      .populate<{
        customer: CustomerEntity;
      }>("customerData")
      .populate<{ sellerData: UserEntity }>("sellerData");
    if (!sale) {
      throw new SaleNotFoundError(uuid);
    }

    return saleDTO(sale);
  }

  async getPayments(saleID: string): Promise<SalePaymentEntity[]> {
    const sale = await SaleModel.findOne({ uuid: saleID });
    if (!sale) {
      throw new SaleNotFoundError(saleID);
    }
    return sale.payments;
  }

  async getTotalSalesNumber(): Promise<number> {
    return SaleModel.countDocuments();
  }

  async changeStatus({
    uuid,
    status,
  }: {
    uuid: string;
    status: TransactionStatus;
  }): Promise<TransactionEntity | null> {
    const updatedSale = await SaleModel.findOneAndUpdate(
      { uuid },
      { status },
      {
        new: true,
      },
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
