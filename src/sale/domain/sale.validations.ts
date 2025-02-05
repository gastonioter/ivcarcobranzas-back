import { z } from "zod";
import { PaymentMethods, SaleStatuses } from "./sale.entity";

export const createSaleSchema = z.object({
  seller: z.string(),
  customer: z.string(),
  iva: z.number().nonnegative(),
  items: z.array(
    z.object({
      product: z.string(),
      quantity: z.number(),
      price: z.number(),
    })
  ),
});

export const updateSaleStatusSchema = z.object({
  uuid: z.string(),
  status: z.nativeEnum(SaleStatuses),
});

export type UpdateSaleStatusRequest = z.infer<typeof updateSaleStatusSchema>;

export const paymentSchema = z.object({
  amount: z.number(),
  paymentMethod: z.nativeEnum(PaymentMethods),
});

export type CreateSaleDTO = z.infer<typeof createSaleSchema>;

export type AddPaymentSchema = z.infer<typeof paymentSchema>;
