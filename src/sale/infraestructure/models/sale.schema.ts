import { SaleStatuses } from "@/sale/domain/sale.entity";
import { InferSchemaType, model, Schema } from "mongoose";

const SaleDetailItemSchema = new Schema({
  uuid: { type: String, required: true },
  product: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const PaymentSchema = new Schema({
  uuid: { type: String, required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  createdAt: { type: Date, required: true },
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

SaleSchema.set("toObject", { virtuals: true });
SaleSchema.set("toJSON", { virtuals: true });

export type SaleDoc = InferSchemaType<typeof SaleSchema>;

export const SaleModel = model<SaleDoc>("Sale", SaleSchema);
