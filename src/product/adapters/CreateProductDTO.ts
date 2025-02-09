import { z } from "zod";

export const CreateEditProductSchema = z.object({
  name: z.string().nonempty(),
  price: z.number().positive(),
  categoryId: z.string().nonempty(),
});

export class CreateProductDTO {
  name: string;
  price: number;
  categoryId: string;

  constructor(data: { name: string; price: number; categoryId: string }) {
    this.name = data.name;
    this.price = data.price;
    this.categoryId = data.categoryId;
  }

  static fromRequest(data: unknown): CreateProductDTO {
    const parsed = CreateEditProductSchema.parse(data);
    return new CreateProductDTO(parsed);
  }
}
