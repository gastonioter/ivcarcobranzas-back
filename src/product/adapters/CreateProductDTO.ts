import { z } from "zod";

export const CreateEditProductSchema = z.object({
  name: z.string().nonempty(),
  price: z.number().positive(),
  categoryId: z.string().nonempty(),
});

export type CreateEditProductDTO = z.infer<typeof CreateEditProductSchema>;
