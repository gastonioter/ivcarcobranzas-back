import {
  CuotaPersistence,
  CuotaSchema,
} from "../../../cuota/infraestrcture/cuota.schema";
import { Schema } from "mongoose";

export interface IPagoPersistence extends Document {
  uuid: string;
  total: number;
  serie: string;
  cuotas: CuotaPersistence;
  createdAt: Date;
}

export const PagoSchema = new Schema<IPagoPersistence>({
  uuid: { type: String, required: true },
  total: { type: Number, required: true },
  serie: { type: String, required: true },
  cuotas: [CuotaSchema],
  createdAt: { type: Date, required: true },
});
