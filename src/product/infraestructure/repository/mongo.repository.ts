import { ProductRepository } from "../../domain/product.repository";
import { CategoryDoc } from "../../../category/infraestructure/model/category.schema";
import { ProductEntity } from "../../domain/product.entity";
import { ProductDoc, ProductModel } from "../model/product.schema";
import { CategoryEntity } from "../../../category/domain/category.entity";
import { CreateEditProductDTO } from "../../adapters/CreateProductDTO";
import { ProductNotFoundError } from "../../domain/product.exceptions";
import { EntityId } from "../../../shared/valueObjects/entityId.vo";

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

    return saved ? this.toEntity(saved) : null;
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

    return this.toEntity(editedProduct);
  };

  /* List All Use Case */
  public list = async (): Promise<ProductEntity[]> => {
    const products = await ProductModel.find()
      .populate<{ category: CategoryDoc }>("category")
      .lean()
      .exec();

    return products.map((productDoc) => this.toEntity(productDoc));
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
    return product ? this.toEntity(product) : null;
  };

  private toEntity(productDoc: any): ProductEntity {
    return new ProductEntity({
      name: productDoc.name,
      price: productDoc.price,
      code: productDoc.code,
      createdAt: productDoc.createdAt,
      uuid: EntityId.fromExisting(productDoc.uuid),
      category: new CategoryEntity({
        uuid: EntityId.fromExisting(productDoc.category.uuid),
        name: productDoc.category.name,
        description: productDoc.category.description,
        createdAt: productDoc.category.createdAt,
      }),
    });
  }
}
