import { CustomerStatus, CustomerType } from "../../domain/customer.entity";
import { InferSchemaType, model, Schema } from "mongoose";

const CustomerSchema = new Schema(
  {
    uuid: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, default: "" },
    phone: { type: String, required: true },
    type: { type: String, required: true, enum: Object.values(CustomerType) },
    status: {
      type: String,
      required: true,
      enum: Object.values(CustomerStatus),
    },
    montoMes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

type CustomerDoc = InferSchemaType<typeof CustomerSchema>;

export const CustomerModel = model<CustomerDoc>("Customer", CustomerSchema);
