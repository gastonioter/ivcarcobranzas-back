import { CategoryRepository } from "@/category/domain/category.repository";
import { CategoryModel } from "../model/category.schema";
import { CategoryEntity } from "@/category/domain/category.entity";
import { categoryDTO } from "../../domain/category.dto";

export class CategoryMongoRepository implements CategoryRepository {
  async create(category: CategoryEntity): Promise<CategoryEntity | null> {
    const categoryDoc = await CategoryModel.create(category);
    return categoryDTO(categoryDoc);
  }

  async findAll(): Promise<CategoryEntity[]> {
    const categories = await CategoryModel.find({});

    return categories.map((category) => {
      return categoryDTO(category);
    });
  }
  async findByName(name: string): Promise<CategoryEntity | null> {
    const categoryDoc = await CategoryModel.findOne({ name });
    if (!categoryDoc) {
      return null;
    }
    return categoryDTO(categoryDoc);
  }
}
