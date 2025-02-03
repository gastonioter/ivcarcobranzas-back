import { z } from "zod";
import { ComprobanteTypes, PaymentMethods } from "./sale.entity";

export const createSaleSchema = z.object({
  seller: z.string(),
  customer: z.string(),
  tipoComprobante: z.nativeEnum(ComprobanteTypes),
  items: z.array(
    z.object({
      product: z.string(),
      quantity: z.number(),
      price: z.number(),
    })
  ),
});

export const paymentSchema = z.object({
  amount: z.number(),
  paymentMethod: z.nativeEnum(PaymentMethods),
});

export type CreateSaleDTO = z.infer<typeof createSaleSchema>;

export type AddPaymentSchema = z.infer<typeof paymentSchema>;
