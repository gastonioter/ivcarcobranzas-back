import { z } from "zod";

export const CreateCategorySchema = z.object({
  name: z.string().nonempty(),
  description: z.string().optional(),
});

export type CreateCategoryDTO = z.infer<typeof CreateCategorySchema>;
