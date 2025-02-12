import z from "zod";
import { PaymentMethods, SalePaymentStatus } from "../salePayment.entity";

export const CreatePaymentSchema = z
  .object({
    amount: z.number().positive(),
    paymentMethod: z.nativeEnum(PaymentMethods),
  })
  .optional();

export const updateSalePaymentSchema = z.object({
  status: z.nativeEnum(SalePaymentStatus),
});
