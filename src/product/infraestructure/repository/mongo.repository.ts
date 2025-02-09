import { ProductRepository } from "@/product/domain/product.repository";
import { EditProductSchemaType } from "@/product/domain/product.validations";
import { CategoryDoc } from "../../../category/infraestructure/model/category.schema";
import { ProductEntity } from "../../domain/product.entity";
import { ProductModel } from "../model/product.schema";
import { CategoryEntity } from "@/category/domain/category.entity";

export class ProductMongoRepository implements ProductRepository {
  /* Create Use Case */
  public save = async (
    product: ProductEntity,
  ): Promise<ProductEntity | null> => {
    const saved = (await ProductModel.create(product)).populate("categoryData");
    return saved ? ProductEntity.fromPersistence(saved) : null;
  };

  /* Edit Use Case */

  public edit = async (
    uuid: string,
    newData: EditProductSchemaType,
  ): Promise<ProductEntity | null> => {
    throw new Error("not implemented");

    // const editedProduct = await ProductModel.findOneAndUpdate(
    //   {
    //     uuid,
    //   },
    //   {
    //     ...newData,
    //   },
    //   {
    //     new: true,
    //   },
    // );

    // if (!editedProduct) {
    //   throw new ProductNotFoundError();
    // }

    // return this._productDTO(editedProduct);
  };

  /* List All Use Case */
  public list = async (): Promise<ProductEntity[]> => {
    //    throw new Error("not implemented");

    const products = await ProductModel.find()
      .populate<{ categoryData: CategoryDoc }>("categoryData")
      .exec();

    return products.map((product) => ProductEntity.fromPersistence(product));
  };

  getTotalSalesNumber = async (): Promise<number> => {
    return await ProductModel.countDocuments().exec();
  };

  findByName = async (name: string): Promise<ProductEntity | null> => {
    const product = await ProductModel.findOne({ name });
    return product ? ProductEntity.fromPersistence(product) : null;
  };
}
