import { z } from "zod";

export const CreatePaymentSchema = z.object({
  customer: z.string(),
  detail: z.array(
    z.object({
      amount: z.number(),
      month: z.number(),
      year: z.number(),
    })
  ),
});

export type CreatePaymentRequest = z.infer<typeof CreatePaymentSchema>;
