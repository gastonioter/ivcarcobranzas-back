import { Schema } from "mongoose";
import { SaleStatus } from "../domain/sale.entity";
import {
  PaymentMethods,
  SalePaymentStatus,
} from "../../../transaction/salePayment/salePayment.entity";
import {
  ITransaction,
  TransactionModel,
} from "../../../transaction/infraestructure/transaction.schema";

export const SalePaymentSchema = new Schema<ISalePayment>({
  uuid: { type: String, required: true },
  paymentMethod: {
    type: String,
    enum: Object.values(PaymentMethods),
    required: true,
  },
  amount: { type: Number, required: true },
  status: {
    type: String,
    enum: Object.values(SalePaymentStatus),
    required: true,
  },
});
export const SaleSchema = new Schema<ISale>({
  payments: { type: [SalePaymentSchema], required: true },
  status: { type: String, enum: Object.values(SaleStatus), required: true },
  budgetId: { type: String },
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
}

export interface ISalePayment extends Document {
  uuid: string;
  paymentMethod: string;
  amount: number;
  status: string;
  createdAt: Date;
}

export const SaleModel = TransactionModel.discriminator("Sale", SaleSchema);
