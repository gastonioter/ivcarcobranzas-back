import { model, Schema } from "mongoose";

export interface IPaymentLine {
  cuotaId: string;
  month: number;
  year: number;
  amount: number;
}

export interface ICuotaPayment {
  uuid: string;
  customerId: string;
  lines: IPaymentLine[];
  serie: string;
  createdAt: Date;
}

const PaymentLineSchema = new Schema<IPaymentLine>({
  cuotaId: { type: String, required: true },
  month:   { type: Number, required: true },
  year:    { type: Number, required: true },
  amount:  { type: Number, required: true },
}, { _id: false });

const CuotaPaymentSchema = new Schema<ICuotaPayment>({
  uuid:       { type: String, required: true, unique: true },
  customerId: { type: String, required: true },
  lines:      { type: [PaymentLineSchema], required: true },
  serie:      { type: String, required: true, unique: true },
  createdAt:  { type: Date, required: true },
}, { timestamps: true });

CuotaPaymentSchema.index({ customerId: 1 });

export const CuotaPaymentModel = model<ICuotaPayment>("CuotaPayment", CuotaPaymentSchema);