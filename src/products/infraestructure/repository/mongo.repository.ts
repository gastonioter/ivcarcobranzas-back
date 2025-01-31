import { ProductEntity } from "@/products/domain/product.entity";
import { ProductRepository } from "@/products/domain/product.repository";
import { Document } from "mongoose";
import { ReadProductDTO } from "@/products/domain/dto/read.dto";
import {
  ProductDoc,
  ProductModel,
  ProductWithCategoryDoc,
} from "../model/product.schema";
import { CategoryDoc } from "@/categories/infraestructure/model/category.schema";

export class ProductMongoRepository implements ProductRepository {
  /* Create Use Case */
  public create = async (
    product: ProductEntity
  ): Promise<ProductEntity | null> => {
    const productDoc = new ProductModel(product);
    const savedDoc = await productDoc.save();
    return this._productDTO(savedDoc);
  };

  /* Edit Use Case */

  public edit = async ({
    uuid,
    ...newData
  }: ProductEntity): Promise<ProductEntity | null> => {
    const editedProduct = await ProductModel.findByIdAndUpdate(
      uuid,
      { ...newData, category: newData.categoryId },
      {
        new: true,
      }
    );

    if (!editedProduct) {
      return null;
    }

    return this._productDTO(editedProduct);
  };

  /* List All Use Case */
  public list = async (): Promise<ReadProductDTO[]> => {
    const products = await ProductModel.find()
      .populate<{ categoryData: CategoryDoc }>("categoryData")
      .exec();

    return products.map(this._productWithCategoryDTO);
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

  private _productWithCategoryDTO = (mongooseDoc: ProductWithCategoryDoc) => {
    // Mapea el documento de Mongoose a la entidad de dominio

    return {
      ...this._productDTO(mongooseDoc),
      category: {
        uuid: mongooseDoc.categoryData.uuid,
        name: mongooseDoc.categoryData.name,
        description: mongooseDoc.categoryData.description,
      },
    };
  };
}
