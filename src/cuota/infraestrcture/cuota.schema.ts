import { model, Schema } from "mongoose";
import { CuotaStatus } from "../domain/cuota.entity";

export interface CuotaPersistence extends Document {
  uuid: string;
  month: number;
  year: number;
  amount: number;
  status: CuotaStatus;
}
export const CuotaSchema = new Schema<CuotaPersistence>({
  uuid: { type: String, required: true },
  month: { type: Number, required: true },
  year: { type: Number, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: Object.values(CuotaStatus), required: true },
});

