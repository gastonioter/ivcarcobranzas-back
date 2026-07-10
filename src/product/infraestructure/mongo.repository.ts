import { CategoryDoc } from "../../category/infraestructure/category.schema";
import { Product } from "../domain/product.entity";
import { ProductRepository, ProductWithCategory } from "../domain/product.repository";
import { ProductDoc, ProductModel } from "./product.schema";

export class ProductMongoRepository implements ProductRepository {
  async save(uuid:string, product: Product): Promise<void> {
    await ProductModel.findOneAndUpdate(
      { uuid },
      this.toPersistence(product),
      { upsert: true, new: true },
    );
  };

  async findAllWithCategory(): Promise<ProductWithCategory[]>{
    const products = await ProductModel.find()
      .populate<{ category: CategoryDoc }>("category")
      .lean()
      .exec();

    return products;
  };

  async count(): Promise<number> {
    return await ProductModel.countDocuments().exec();
  };

  async findById(uuid: string): Promise<Product | null> {
    const product = await ProductModel.findOne({ uuid });
    if(!product) return null;
    return this.toDomain(product);
  };

  async findByName(name: string): Promise<Product | null> {
    const product = await ProductModel.findOne({ name });
    if(!product) return null;
    return this.toDomain(product);
  };

  private toPersistence(product: Product): ProductDoc {
    return {
      uuid: product.getId(),
      name: product.name,
      price: product.price.value,
      code: product.code,
      categoryId: product.categoryId,
      createdAt: product.createdAt,
    };
  }

  private toDomain(doc:ProductDoc):Product{
    return Product.fromPersistence(doc);
  }
}
