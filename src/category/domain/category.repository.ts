import { CategoryEntity } from "./category.entity";

export interface CategoryRepository {
  create(category: CategoryEntity): Promise<CategoryEntity | null>;
  findAll(): Promise<CategoryEntity[]>;
  findByName(uuid: string): Promise<CategoryEntity | null>;
}
