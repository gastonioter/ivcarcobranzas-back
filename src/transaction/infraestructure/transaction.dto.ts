import z from "zod";

export const createTransactionSchema = z.object({
  customerId: z.string(),
  iva: z.number(),
  sellerId: z.string(),
  details: z.array(
    z.object({
      uuid: z.string().uuid(),
      product: z.string(),
      quantity: z.preprocess(
        (val) => (typeof val == "string" ? Number(val) : val), // convierte strings a números antes de la validación.`
        z.number().positive().finite(),
      ),
      unitPrice: z.preprocess(
        (val) => (typeof val == "string" ? Number(val) : val),
        z.number().positive().finite(),
      ),
    }),
  ),
});
