import { InferSchemaType, model, Schema } from "mongoose";

const PaymentSchema = new Schema({
  uuid: { type: String, required: true },
  customer: { type: String, required: true },
  createdAt: { type: Date, required: true },
  detail: [
    {
      amount: { type: Number, required: true },
      month: { type: Number, required: true },
      year: { type: Number, required: true },
    },
  ],
});

export type PaymentDoc = InferSchemaType<typeof PaymentSchema>;

export const PaymentModel = model("Payment", PaymentSchema);
