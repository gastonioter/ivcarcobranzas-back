import { model, Schema } from "mongoose";
import { CuotaStatus } from "../domain/cuota.entity";

export interface ICuota {
  uuid: string;
  customerId: string;
  month: number;
  year: number;
  amount: number;
  status: CuotaStatus;
  createdAt: Date;
}

export const CuotaSchema = new Schema<ICuota>({
  uuid: { type: String, required: true, unique: true },
  customerId: { type: String, required: true },
  month: { type: Number, required: true },
  year: { type: Number, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: Object.values(CuotaStatus), required: true },
  createdAt: { type: Date, required: true },
});

CuotaSchema.index({ customerId: 1, year: 1 });
CuotaSchema.index({ customerId: 1, month: 1, year: 1 });

export const CuotaModel = model<ICuota>("CuotaV2", CuotaSchema);