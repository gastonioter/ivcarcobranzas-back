import z from "zod";

export const createCloudCategorySchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  price: z.number().positive(),
});

const editPriceCategorySchema = createCloudCategorySchema.extend({
  uuid: z.string(),
});

export type CreatePriceCategoryDTO = z.infer<typeof createCloudCategorySchema>;
export type EditPriceCategoryDTO = z.infer<typeof editPriceCategorySchema>;
