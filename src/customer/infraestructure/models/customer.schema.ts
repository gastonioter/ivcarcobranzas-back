import { InferSchemaType, model, Schema } from "mongoose";
import {
  CloudCustomerType,
  CustomerStatus
} from "../../domain/types";

const CustomerSchema = new Schema(
  {
    uuid: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, default: "" },
    phone: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: Object.values(CloudCustomerType),
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(CustomerStatus),
    },
  },
  { timestamps: true },
);

type CustomerDoc = InferSchemaType<typeof CustomerSchema>;

export const CustomerModel = model<CustomerDoc>("Customer", CustomerSchema);
