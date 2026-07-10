import { MongoServerError } from "mongodb";
import { CategoryAlreadyExists } from "../domain/categories.exceptions";
import { Category } from "../domain/category.entity";
import { CategoryRepository } from "../domain/category.repository";
import { CategoryDoc, CategoryModel } from "./category.schema";

export class CategoryMongoRepository implements CategoryRepository {
  async save(uuid: string, data: Category): Promise<void> {
    try {
      await CategoryModel.findOneAndUpdate({ uuid }, this.toPersistence(data), {
        upsert: true,
        new: true,
      });
    } catch (err) {
      if (err instanceof MongoServerError && err.code === 11000) {
        throw new CategoryAlreadyExists();
      }
      throw err;
    }
  }

  async findAll(): Promise<Category[]> {
    const docs = await CategoryModel.find().lean();
    return docs.map((doc: CategoryDoc) => this.toDomain(doc));
  }

  async findByName(name: string): Promise<Category | null> {
    const doc = await CategoryModel.findOne({ name }).lean();
    return doc ? this.toDomain(doc) : null;
  }

  async findById(id: string): Promise<Category | null> {
    const doc = await CategoryModel.findOne({ uuid: id }).lean();
    return doc ? this.toDomain(doc) : null;
  }

  private toPersistence(c: Category): CategoryDoc {
    return {
      uuid: c.id,
      name: c.name,
      description: c.description,
      createdAt: c.createdAt,
    };
  }

  private toDomain(doc: CategoryDoc): Category {
    return Category.fromPersistence(doc);
  }
}
