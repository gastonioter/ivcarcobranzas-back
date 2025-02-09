import { CategoryEntity } from "../../../category/domain/category.entity";
import {
  ProducEntityWithCategories,
  ProductEntity,
} from "@/product/domain/product.entity";
import { ProductRepository } from "@/product/domain/product.repository";
import { EditProductSchemaType } from "@/product/domain/product.validations";
import { ProductNotFoundError } from "../../domain/product.exceptions";
import {
  ProductDoc,
  ProductModel,
  ProductWithCategoryDoc,
} from "../model/product.schema";

export class ProductMongoRepository implements ProductRepository {
  /* Create Use Case */
  public create = async (
    product: ProductEntity,
  ): Promise<ProductEntity | null> => {
    const productDoc = new ProductModel(product);
    const savedDoc = await productDoc.save();
    return this._productDTO(savedDoc);
  };

  /* Edit Use Case */

  public edit = async (
    uuid: string,
    newData: EditProductSchemaType,
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
    );

    if (!editedProduct) {
      throw new ProductNotFoundError();
    }

    return this._productDTO(editedProduct);
  };

  /* List All Use Case */
  public list = async (): Promise<ProducEntityWithCategories[]> => {
    throw new Error("not implemented");

    // const products = await ProductModel.find()
    //   .populate<{ categoryData: CategoryDoc }>("categoryData")
    //   .exec();

    // return products.map(this._productWithCategoryDTO);
  };

  private _productDTO = (mongooseDoc: ProductDoc) => {
    // Mapea el documento de Mongoose a la entidad de dominio

    return {
      uuid: mongooseDoc.uuid,
      name: mongooseDoc.name,
      price: mongooseDoc.price,
      code: mongooseDoc.code,
      categoryId: mongooseDoc.categoryId!,
    };
  };

  getTotalSalesNumber = async (): Promise<number> => {
    return await ProductModel.countDocuments().exec();
  };

  findByName = async (name: string): Promise<ProductEntity | null> => {
    return await ProductModel.findOne({ name });
  };

  private _productWithCategoryDTO = (mongooseDoc: ProductWithCategoryDoc) => {
    // Mapea el documento de Mongoose a la entidad de dominio

    return {
      ...this._productDTO(mongooseDoc),
      category: {
        ...CategoryEntity.fromPersistence(mongooseDoc.categoryData),
      },
    };
  };
}
