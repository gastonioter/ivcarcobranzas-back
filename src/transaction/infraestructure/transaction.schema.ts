import { model, Schema } from "mongoose";

export const DetailSchema = new Schema<IDetail>({
  uuid: { type: String, required: true },
  product: { type: String, required: true },
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
});

export const TransactionSchema = new Schema<ITransaction>(
  {
    uuid: { type: String, required: true },
    serie: { type: String, required: true },
    customerId: { type: String, required: true },
    createdAt: { type: Date, required: true },
    details: { type: [DetailSchema], required: true },
    totalAmount: { type: Number, required: true },
    iva: { type: Number, required: true },
    sellerId: { type: String, required: true },
  },
  {
    discriminatorKey: "type",
    _id: false,
    timestamps: false,
  },
);

TransactionSchema.virtual("customer", {
  ref: "Customer",
  localField: "customerId",
  foreignField: "uuid",
  justOne: true,
});

interface IDetail extends Document {
  uuid: string;
  product: string;
  quantity: number;
  unitPrice: number;
}

export interface ITransaction extends Document {
  uuid: string;
  serie: string;
  details: IDetail[];
  totalAmount: number;
  sellerId: string;
  customerId: string;
  iva: number;
  createdAt: Date;
}

export const TransactionModel = model("Transaction", TransactionSchema);
