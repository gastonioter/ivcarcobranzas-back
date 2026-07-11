import { InferSchemaType, model, Schema } from "mongoose";
import { CuotaStatus } from "../domain/cuota.entity";

export const CuotaSchema = new Schema({
  uuid: { type: String, required: true, unique: true },
  customerId: { type: String, required: true },
  month: { type: Number, required: true },
  year: { type: Number, required: true },
  amount: { type: Number, required: true },
  sequence: { type: Number, required: true },
  status: { type: String, enum: Object.values(CuotaStatus), required: true },
  createdAt: { type: Date, required: true },
});

CuotaSchema.index({ customerId: 1, year: 1 });
CuotaSchema.index({ customerId: 1, month: 1, year: 1 });

export type CuotaDoc = InferSchemaType<typeof CuotaSchema>;
export const CuotaModel = model("CuotaV2", CuotaSchema);
