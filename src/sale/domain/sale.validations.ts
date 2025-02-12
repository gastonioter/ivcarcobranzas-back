import { z } from "zod";
import {
  BudgetStatus,
  PaymentMethods,
  SalePaymentStatuses,
  SaleStatus,
} from "./sale.entity";

/* REQUEST'S PAYLOAD VALIDATION SCHEMAS */
export const createTransactionRequestSchema = z.object({
  seller: z.string(),
  customer: z.string(),
  iva: z.number().nonnegative(),
  isBudget: z.boolean().optional(),
  items: z.array(
    z.object({
      product: z.string(),
      quantity: z.number(),
      unitPrice: z.number(),
    })
  ),
});

export const updateSaleStatusRequestSchema = z.object({
  uuid: z.string(),
  status: z.union([z.nativeEnum(BudgetStatus), z.nativeEnum(SaleStatus)]),
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

export type CreateSaleRequestType = z.infer<
  typeof createTransactionRequestSchema
>;

export type AddPaymentRequestType = z.infer<typeof addPaymentRequestSchema>;
