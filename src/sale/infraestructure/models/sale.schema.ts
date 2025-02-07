import { InferSchemaType, model, Schema } from "mongoose";
import {
  BudgetStatus,
  PaymentMethods,
  SalePaymentStatuses,
  SaleStatus,
  TransactionStatus,
  TransactionType,
} from "../../domain/sale.entity";

const SaleDetailItemSchema = new Schema({
  uuid: { type: String, required: true },
  product: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  total: { type: Number, required: true },
});

const PaymentSchema = new Schema({
  uuid: { type: String, required: true },
  amount: { type: Number, required: true },
  status: {
    type: String,
    required: true,
    enum: Object.values(SalePaymentStatuses),
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: Object.values(PaymentMethods),
  },
  createdAt: { type: Date, required: true, default: Date.now },
});

const StatusSchema = new Schema<TransactionStatus>(
  {
    type: {
      type: String,
      enum: Object.values(TransactionType),
      required: true,
    },
    status: {
      type: String,
      enum: [...Object.values(BudgetStatus), ...Object.values(SaleStatus)],
      required: true,
    },
  },
  { _id: false }
);
const SaleSchema = new Schema(
  {
    uuid: { type: String, required: true },
    seller: { type: String, required: true },
    customer: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    serie: { type: String, required: true },
    isBudget: { type: Boolean, required: true, default: false },
    iva: { type: Number, required: true, default: 0 },
    status: {
      type: StatusSchema,
      required: true,
    },
    items: [SaleDetailItemSchema],
    payments: [PaymentSchema],
  },
  { timestamps: true }
);

SaleSchema.virtual("sellerData", {
  ref: "User",
  localField: "seller",
  foreignField: "uuid",
  justOne: true,
});

SaleSchema.virtual("customerData", {
  ref: "Customer",
  localField: "customer",
  foreignField: "uuid",
  justOne: true,
});

SaleSchema.set("toObject", { virtuals: true });
SaleSchema.set("toJSON", { virtuals: true });

export type SaleDoc = InferSchemaType<typeof SaleSchema>;

export const SaleModel = model<SaleDoc>("Sale", SaleSchema);
