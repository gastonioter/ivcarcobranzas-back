import { Category } from "./category.entity";

export interface CategoryRepository {
  save(id:string, category: Category): Promise<void>;
  findAll(): Promise<Category[]>;
  findByName(uuid: string): Promise<Category | null>;
  findById(uuid: string): Promise<Category | null>;
}
