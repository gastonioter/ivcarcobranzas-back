import { SaleModel } from "../../../transaction/sale/infraestructure/sale.schema";
import { SalePayment } from "../salePayment.entity";
import { SalePaymentRepository } from "../salePayment.repository";
import { Sale } from "../../sale/domain/sale.entity";

export class SalePaymentMongoRepository implements SalePaymentRepository {
  async update({
    saleID,
    paymentID,
    status,
  }: {
    saleID: string;
    paymentID: string;
    status: string;
  }): Promise<Sale> {
    const updatedSale = await SaleModel.findOneAndUpdate(
      {
        uuid: saleID,
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

    return Sale.fromPersistence(updatedSale);
  }

  async findAll(saleID: string): Promise<SalePayment[]> {
    const sale = await SaleModel.findOne({ uuid: saleID }).select("payments");

    if (!sale) {
      throw new Error("Sale not found");
    }

    return sale.payments.map(SalePayment.fromPersistence);
  }
}
