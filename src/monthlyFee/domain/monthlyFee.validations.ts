import { z } from "zod";

export const CreateMonthlyFeeSchema = z.object({
  amount: z.number(),
  customer: z.string(),
  month: z.number(),
  year: z.number(),
});

export type CreateMonthlyFeeRequest = z.infer<typeof CreateMonthlyFeeSchema>;
