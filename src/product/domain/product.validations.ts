import { z } from "zod";

export const CreateProductSchema = z.object({
  name: z.string().nonempty(),
  price: z.number().positive(),
  categoryId: z.string().nonempty(),
});

export const EditProductSchema = CreateProductSchema.extend({
  uuid: z.string().nonempty(),
});

export type EditProductSchemaType = z.infer<typeof EditProductSchema>;
export type CreateProductSchemaType = z.infer<typeof CreateProductSchema>;
