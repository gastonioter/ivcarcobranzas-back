import { model, Schema, InferSchemaType } from "mongoose";
import { MonthlyFeeStatuses } from "../domain/monthlyFee.entity";
import { CustomerType } from "@/customer/domain/customer.entity";

const MonthlyFeeSchema = new Schema(
  {
    uuid: { type: String, required: true },
    amount: { type: Number, required: true },
    customer: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: Object.values(MonthlyFeeStatuses),
    },

    month: { type: Number, required: true },
    year: { type: Number, required: true },
  },
  { timestamps: true }
);

export type MonthlyFeeDoc = InferSchemaType<typeof MonthlyFeeSchema>;

export const MonthlyFeeModel = model<MonthlyFeeDoc>(
  "MonthlyFee",
  MonthlyFeeSchema
);
