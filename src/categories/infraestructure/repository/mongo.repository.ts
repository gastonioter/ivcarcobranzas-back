import { Category } from "@/categories/domain/category.entity";
import { CategoryRepository } from "@/categories/domain/category.repository";
import { CategoryModel } from "../model/category.schema";

export class CategoryMongoRepository implements CategoryRepository {
  async create(category: Category): Promise<Category | null> {
    const newCategory = await CategoryModel.create(category);
    return {
      uuid: newCategory.uuid,
      name: newCategory.name,
      description: newCategory.description,
    };
  }
  async findAll(): Promise<Category[]> {
    throw new Error("Method not implemented.");
  }
  async findByName(name: string): Promise<Category | null> {
    return await CategoryModel.findOne({ name });
  }
}
