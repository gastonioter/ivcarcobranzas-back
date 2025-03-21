import { SalePayment } from "@/transaction/salePayment/salePayment.entity";
import { Sale } from "../domain/sale.entity";
import { SaleRepository } from "../domain/sale.repository";
import { SaleModel } from "./sale.schema";

export class SaleMongoRepository implements SaleRepository {
  async save(sale: Sale): Promise<Sale> {
    try {
      const saved = await SaleModel.create({
        uuid: sale.getId(),
        serie: sale.getSerie(),
        customerId: sale.getCustomerId(),
        details: sale.getDetails(),
        totalAmount: sale.getTotalAmount(),
        iva: sale.getIva(),
        createdAt: sale.getCreatedAt(),
        sellerId: sale.getSellerId(),
        payments: sale.getPayments().map(this.mapPaymentToPersistance),
        status: sale.getStatus(),
        budgetId: sale.getBudgetId(),
        discount: sale.getDiscount(),
      });

      return Sale.fromPersistence(saved);
    } catch (e) {
      console.log(e);

      throw new Error("No se pudo crear la venta");
    }
  }
  async findAll(): Promise<Sale[]> {
    const sales = await SaleModel.find({});

    return sales.map(Sale.fromPersistence);
  }
  async findByUuid(uuid: string): Promise<Sale> {
    const sale = await SaleModel.findOne({ uuid });
    if (!sale) {
      throw Error("Venta no encontrada");
    }
    return Sale.fromPersistence(sale);
  }
  async update(sale: Sale): Promise<Sale> {
    const updated = await SaleModel.findOneAndUpdate(
      { uuid: sale.getId() },
      {
        status: sale.getStatus(),
        $set: {
          payments: sale.getPayments().map(this.mapPaymentToPersistance),
        },
      },
      {
        lean: true,
        new: true,
      },
    );
    if (!updated) {
      throw Error("La venta no existe");
    }

    return Sale.fromPersistence(updated);
  }

  async getSalesByCustomer(uuid: string): Promise<Sale[]> {
    const sales = await SaleModel.find({
      customerId: uuid,
    });

    return sales.map(Sale.fromPersistence);
  }
  async countOfSales(): Promise<number> {
    return await SaleModel.countDocuments();
  }

  private mapPaymentToPersistance(payment: SalePayment) {
    return {
      uuid: payment.getId(),
      paymentMethod: payment.getMethod(),
      amount: payment.getAmount(),
      status: payment.getStatus(),
      createdAt: payment.getCreatedAt(),
      isCupon: payment.isCuponPayment(),
      updatedAt: payment.getUpdatedAt(),
    };
  }
}
