import { Schema } from "mongoose";
import { PaymentMethods, SalePaymentStatus } from "../salePayment.entity";

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
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date },
  isCupon: { type: Boolean, default: false },
});

export interface ISalePayment extends Document {
  uuid: string;
  paymentMethod: string;
  amount: number;
  status: string;
  createdAt: Date;
  isCupon?: boolean;
  updatedAt?: Date;
}
