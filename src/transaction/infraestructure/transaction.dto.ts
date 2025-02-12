import z from "zod";

export const createTransactionSchema = z.object({
  customerId: z.string(),
  iva: z.number(),
  details: z.array(
    z.object({
      product: z.string(),
      quantity: z.number(),
      unitPrice: z.number(),
    }),
  ),
});
