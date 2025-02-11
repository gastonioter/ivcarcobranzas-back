import { InferSchemaType, model, Schema } from "mongoose";
import { CustomerStatus } from "../../domain/types";

const CustomerSchema = new Schema(
  {
    uuid: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String, required: true },
    priceCategoryId: { type: String },
    status: {
      type: String,
      required: true,
      enum: Object.values(CustomerStatus),
    },
  },
  { timestamps: true },
);

CustomerSchema.virtual("priceCategory", {
  ref: "PriceCategory",
  localField: "priceCategoryId",
  foreignField: "uuid",
  justOne: true,
});

CustomerSchema.set("toObject", { virtuals: true });
CustomerSchema.set("toJSON", { virtuals: true });

export type CustomerDoc = InferSchemaType<typeof CustomerSchema>;

export const CustomerModel = model<CustomerDoc>("Customer", CustomerSchema);
