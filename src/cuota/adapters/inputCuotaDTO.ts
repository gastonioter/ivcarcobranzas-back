import z from "zod";

const createCuotaSchema = z.object({
  amount: z.number(),
  customerId: z.string().uuid(),
});

export type CreateCuotaDTO = z.infer<typeof createCuotaSchema>;
