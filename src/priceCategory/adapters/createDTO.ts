import z from "zod";

export const createPriceCategorySchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  price: z.number().positive(),
});

const editPriceCategorySchema = createPriceCategorySchema.extend({
  uuid: z.string(),
});

export type EditPriceCategoryDTO = z.infer<typeof editPriceCategorySchema>;
export type CreatePriceCategoryDTO = z.infer<typeof createPriceCategorySchema>;
