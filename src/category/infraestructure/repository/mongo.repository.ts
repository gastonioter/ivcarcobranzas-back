import { CategoryEntity } from "../../domain/category.entity";
import { CategoryRepository } from "../../domain/category.repository";
import { CategoryModel } from "../model/category.schema";

export class CategoryMongoRepository implements CategoryRepository {
  async save(category: CategoryEntity): Promise<CategoryEntity | null> {
    const categoryDoc = await CategoryModel.create(category);
    return categoryDoc ? CategoryEntity.fromPersistence(categoryDoc) : null;
  }

  async findAll(): Promise<CategoryEntity[]> {
    const categories = await CategoryModel.find({});

    return categories.map((category) => {
      return CategoryEntity.fromPersistence(category);
    });
  }
  async findByName(name: string): Promise<CategoryEntity | null> {
    const categoryDoc = await CategoryModel.findOne({ name }).lean();
    return categoryDoc ? CategoryEntity.fromPersistence(categoryDoc) : null;
  }
}
