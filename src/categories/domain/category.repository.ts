import { Category } from "./category.entity";

export interface CategoryRepository {
  create(category: Category): Promise<Category | null>;
  findAll(): Promise<Category[]>;
  findByName(uuid: string): Promise<Category | null>;
}
