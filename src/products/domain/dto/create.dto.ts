import { Category } from "@/categories/domain/category.entity";

export interface CreateProductDTO {
  name: string;
  price: number;
  categoryId: string;
}


