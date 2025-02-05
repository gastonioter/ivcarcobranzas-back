import { z } from "zod";
import {
  PaymentMethods,
  SalePaymentStatuses,
  SaleStatuses,
} from "./sale.entity";

/* REQUEST'S PAYLOAD VALIDATION SCHEMAS */
export const createSaleRequestSchema = z.object({
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

export const updateSaleStatusRequestSchema = z.object({
  uuid: z.string(),
  status: z.nativeEnum(SaleStatuses),
});

export const addPaymentRequestSchema = z.object({
  amount: z.number(),
  paymentMethod: z.nativeEnum(PaymentMethods),
});

export const updateSalePaymentStatusRequestSchema = z.object({
  status: z.nativeEnum(SalePaymentStatuses),
});

/* TYPES */
export type UpdateSaleStatusRequestType = z.infer<
  typeof updateSaleStatusRequestSchema
>;

export type UpdateSalePaymentStatusRequestType = z.infer<
  typeof updateSalePaymentStatusRequestSchema
>;

export type CreateSaleRequestType = z.infer<typeof createSaleRequestSchema>;

export type AddPaymentRequestType = z.infer<typeof addPaymentRequestSchema>;
