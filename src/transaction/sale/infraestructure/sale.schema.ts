import { Schema } from "mongoose";
import {
  ITransaction,
  TransactionModel,
} from "../../../transaction/infraestructure/transaction.schema";
import { SaleStatus } from "../domain/sale.entity";
import { SalePaymentSchema } from "../../../transaction/salePayment/infraestructure/salePayment.schema";
import { ISalePayment } from "../../salePayment/infraestructure/salePayment.schema";

export const SaleSchema = new Schema<ISale>({
  payments: { type: [SalePaymentSchema], required: true },
  status: { type: String, enum: Object.values(SaleStatus), required: true },
  budgetId: { type: String },
  discount: { type: Number },
});

SaleSchema.virtual("seller", {
  ref: "User",
  localField: "sellerId",
  foreignField: "uuid",
  justOne: true,
});

export interface ISale extends ITransaction {
  payments: ISalePayment[];
  status: string;
  budgetId?: string;
  discount?: number;
}

export const SaleModel = TransactionModel.discriminator("Sale", SaleSchema);
