import { z } from "zod";

export const createSaleSchema = z.object({
  seller: z.string(),
  customer: z.string(),
  items: z.array(
    z.object({
      uuid: z.string(),
      product: z.string(),
      quantity: z.number(),
      price: z.number(),
    })
  ),
});

export type CreateSaleDTO = z.infer<typeof createSaleSchema>;
