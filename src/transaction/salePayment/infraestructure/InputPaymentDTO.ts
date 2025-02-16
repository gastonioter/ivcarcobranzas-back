import z from "zod";
import { PaymentMethods, SalePaymentStatus } from "../salePayment.entity";

export const CreatePaymentSchema = z.object({
  type: z.literal("CREATE"),
  amount: z.number({
    message: "El monto es invalido",
    required_error: "El monto es requerido",
  }),
  paymentMethod: z.nativeEnum(PaymentMethods),
  isCupon: z.boolean().optional(),
});

export const UpdatePaymentSchema = z.object({
  type: z.literal("UPDATE"),
  status: z.nativeEnum(SalePaymentStatus),
  uuid: z.string().uuid(),
});

export const PaymentSchema = z.discriminatedUnion("type", [
  CreatePaymentSchema,
  UpdatePaymentSchema,
]);
