import { PriceCategory } from "../domain/priceCategory.entity";
import { PriceCategoryRepo } from "../domain/priceCategory.repo";
import { priceCategoryModel } from "./db.schema";

export class MongoPriceCategoryRepository implements PriceCategoryRepo {
  async findAll(): Promise<PriceCategory[]> {
    const categories = await priceCategoryModel.find({}).lean();
    return categories.map((category) =>
      PriceCategory.fromPersistence(category),
    );
  }
  async findById(uuid: string): Promise<PriceCategory> {
    try {
      const category = await priceCategoryModel.findOne({ uuid }).lean();
      return PriceCategory.fromPersistence(category);
    } catch (error) {
      throw new Error("La categoria no existe");
    }
  }
  async save(category: PriceCategory): Promise<PriceCategory> {
    const newCategory = await priceCategoryModel.create({
      uuid: category.getId(),
      name: category.getName(),
      price: category.getPrice(),
      description: category.getDescription(),
    });
    return PriceCategory.fromPersistence(newCategory);
  }
  update(category: PriceCategory): Promise<PriceCategory> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
