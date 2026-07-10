import { InferSchemaType, model, Schema } from "mongoose";
import { CustomerModalidad, CustomerStatus } from "../../customer/domain/types";

const CustomerSchema = new Schema(
  {
    uuid: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    cuit: { type: String, required: true },
    status: { type: String, enum: Object.values(CustomerStatus), required: true },
    type: { type: String, enum: Object.values(CustomerModalidad), required: true },
    createdAt: { type: Date, required: true },
  },
  { timestamps: true },
);

export type CustomerDoc = InferSchemaType<typeof CustomerSchema>;

export const CustomerModel = model<CustomerDoc>("CustomerV2", CustomerSchema);
