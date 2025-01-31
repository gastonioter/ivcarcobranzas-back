import { Category } from "@/categories/domain/category.entity";
import { CreateProductDTO } from "./create.dto";

export interface ReadProductDTO {
  name: string;
  price: number;
  code: string;
  category: Pick<Category, "name" | "description" | "uuid">;
}
