import { InferSchemaType, model, Schema } from "mongoose";

const priceCategorySchema = new Schema({
  uuid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export type PriceCategoryDoc = InferSchemaType<typeof priceCategorySchema>;

export const priceCategoryModel = model<PriceCategoryDoc>(
  "PriceCategory",
  priceCategorySchema,
);
