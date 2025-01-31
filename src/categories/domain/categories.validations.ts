import { z } from "zod";

export const CreateCategorySchema = z.object({
  name: z.string().nonempty(),
  description: z.string().optional(),
});
