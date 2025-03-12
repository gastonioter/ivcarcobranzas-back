import { CloudCategory } from "../domain/cloudCategory.entity";
import { PriceCategoryRepo } from "../domain/cloudCategory.repo";
import { CloudCategoryModel } from "./db.schema";

export class MongoPriceCategoryRepository implements PriceCategoryRepo {
  async findAll(): Promise<CloudCategory[]> {
    const categories = await CloudCategoryModel.find({}).lean();
    return categories.map((category) =>
      CloudCategory.fromPersistence(category),
    );
  }
  async findById(uuid: string): Promise<CloudCategory> {
    try {
      const category = await CloudCategoryModel.findOne({ uuid }).lean();
      return CloudCategory.fromPersistence(category);
    } catch (error) {
      throw new Error("La categoria no existe");
    }
  }
  async save(category: CloudCategory): Promise<CloudCategory> {
    const newCategory = await CloudCategoryModel.create({
      uuid: category.getId(),
      name: category.getName(),
      price: category.getPrice(),
      description: category.getDescription(),
    });
    return CloudCategory.fromPersistence(newCategory);
  }
  update(category: CloudCategory): Promise<CloudCategory> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
