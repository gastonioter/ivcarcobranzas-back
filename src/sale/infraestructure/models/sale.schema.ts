import { InferSchemaType, model, Schema } from "mongoose";
import { PaymentMethods, SaleStatuses } from "../../domain/sale.entity";

const SaleDetailItemSchema = new Schema({
  product: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const PaymentSchema = new Schema({
  amount: { type: Number, required: true },
  paymentMethod: {
    type: String,
    required: true,
    enum: Object.values(PaymentMethods),
  },
  createdAt: { type: Date, required: true, default: Date.now },
});

const SaleSchema = new Schema(
  {
    uuid: { type: String, required: true },
    seller: { type: String, required: true },
    customer: { type: String, required: true },
    serie: { type: String, required: true },
    status: { type: String, required: true, enum: Object.values(SaleStatuses) },
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

export type SaleDoc = InferSchemaType<typeof SaleSchema>;

export const SaleModel = model<SaleDoc>("Sale", SaleSchema);
