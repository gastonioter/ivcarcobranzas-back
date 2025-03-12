import { CategoryDoc } from "../../../category/infraestructure/model/category.schema";
import { ProductEntity } from "../../domain/product.entity";
import { ProductNotFoundError } from "../../domain/product.exceptions";
import { ProductRepository } from "../../domain/product.repository";
import { ProductModel } from "../model/product.schema";

export class ProductMongoRepository implements ProductRepository {
  /* Create Use Case */
  public save = async (
    product: ProductEntity,
  ): Promise<ProductEntity | null> => {
    const saved = await ProductModel.create({
      name: product.getName(),
      price: product.getPrice(),
      code: product.getCode(),
      categoryId: product.getCategory().getId(),
      createdAt: product.getCreatedAt(),
      uuid: product.getId(),
    });

    if (saved) {
      const persisted = await this.findByName(product.getName());
      return persisted ? persisted : null;
    }
    return null;
  };

  /* Edit Use Case */

  public edit = async (
    uuid: string,
    newData: Partial<ProductEntity>,
  ): Promise<ProductEntity | null> => {
    const editedProduct = await ProductModel.findOneAndUpdate(
      {
        uuid,
      },
      {
        ...newData,
      },
      {
        new: true,
      },
    )
      .populate<{ category: CategoryDoc }>("category")
      .lean();

    if (!editedProduct) {
      throw new ProductNotFoundError();
    }

    return ProductEntity.fromPersistence(editedProduct);
  };

  /* List All Use Case */
  public list = async (): Promise<ProductEntity[]> => {
    const products = await ProductModel.find()
      .populate<{ category: CategoryDoc }>("category")
      .lean()
      .exec();

    return products.map((productDoc) =>
      ProductEntity.fromPersistence(productDoc),
    );
  };

  getTotalSalesNumber = async (): Promise<number> => {
    return await ProductModel.countDocuments().exec();
  };

  findByName = async (name: string): Promise<ProductEntity | null> => {
    const product = await ProductModel.findOne({ name })
      .populate<{
        category: CategoryDoc;
      }>("category")
      .lean();
    return product ? ProductEntity.fromPersistence(product) : null;
  };
}
