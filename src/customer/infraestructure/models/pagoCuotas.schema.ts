import {
  CuotaPersistence,
  CuotaSchema,
} from "../../../cuota/infraestrcture/cuota.schema";
import { Schema } from "mongoose";

export interface IPagoPersistence extends Document {
  uuid: string;
  amount: number;
  serie: string;
  cuotas: CuotaPersistence;
  createdAt: Date;
}

export const PagoSchema = new Schema<IPagoPersistence>({
  uuid: { type: String, required: true },
  amount: { type: Number, required: true },
  serie: { type: String, required: true },
  cuotas: [CuotaSchema],
  createdAt: { type: Date, required: true },
});
