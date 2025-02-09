import { CategoryEntity } from "../../domain/category.entity";
import { CategoryRepository } from "../../domain/category.repository";
import { CategoryModel } from "../model/category.schema";

export class CategoryMongoRepository implements CategoryRepository {
  async save(category: CategoryEntity): Promise<CategoryEntity | null> {
    const categoryDoc = await CategoryModel.create({
      name: category.getName(),
      description: category.getDescription(),
      createdAt: category.getCreatedAt(),
      uuid: category.getId(),
    });
    return categoryDoc ? new CategoryEntity(categoryDoc) : null;
  }

  async findAll(): Promise<CategoryEntity[]> {
    const categories = await CategoryModel.find({});

    return categories.map((category) => {
      return new CategoryEntity(category);
    });
  }
  async findByName(name: string): Promise<CategoryEntity | null> {
    const categoryDoc = await CategoryModel.findOne({ name }).lean();
    return categoryDoc ? new CategoryEntity(categoryDoc) : null;
  }

  async findById(id: string): Promise<CategoryEntity | null> {
    const categoryDoc = await CategoryModel.findOne({ uuid: id }).lean();
    return categoryDoc ? new CategoryEntity(categoryDoc) : null;
  }
}
