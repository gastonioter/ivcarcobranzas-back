import { CategoryEntity } from "./category.entity";

/* Usar la CategoryEntity */
export interface CategoryRepository {
  save(category: CategoryEntity): Promise<CategoryEntity | null>;
  findAll(): Promise<CategoryEntity[]>;
  findByName(uuid: string): Promise<CategoryEntity | null>;
}
