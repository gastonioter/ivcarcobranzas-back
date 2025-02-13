import {
  SalePayment,
  SalePaymentStatus,
} from "@/transaction/salePayment/salePayment.entity";
import { Sale } from "../domain/sale.entity";
import { SaleRepository } from "../domain/sale.repository";
import { SaleModel, SalePaymentSchema } from "./sale.schema";

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
        payments: sale.getPayments(),
        status: sale.getStatus(),
        budgetId: sale.getBudgetId(),
      });

      return Sale.fromPersistence(saved);
    } catch (e) {
      console.log(e);
      console.log(sale)
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
    const paymentInstance = sale.getPayments().at(-1);

    const payment = {
      uuid: paymentInstance!.getId(),
      status: paymentInstance!.getStatus(),
      amount: paymentInstance!.getAmount(),
      paymentMethod: paymentInstance!.getMethod(),
      createdAt: paymentInstance!.getCreatedAt(),
    };

    const updated = await SaleModel.findOneAndUpdate(
      { uuid: sale.getId() },
      {
        status: sale.getStatus(),
        $push: {
          payments: payment,
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
  savePayment(saleId: string, payment: SalePayment): Promise<Sale> {
    throw new Error("Method not implemented.");
  }
  updatePayment(
    saleId: string,
    paymentId: string,
    payment: SalePaymentStatus,
  ): Promise<Sale> {
    throw new Error("Method not implemented.");
  }
}
