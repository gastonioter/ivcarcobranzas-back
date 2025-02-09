import { ProductDTO } from "../adapters/productDTO";
import { ProducEntityWithCategories, ProductEntity } from "./product.entity";
import { EditProductSchemaType } from "./product.validations";

export interface ProductRepository {
  save(product: ProductEntity): Promise<ProductEntity | null>;
  findByName(name: string): Promise<ProductEntity | null>;
  edit(
    uuid: string,
    product: EditProductSchemaType,
  ): Promise<ProductEntity | null>;
  list(): Promise<ProductEntity[]>;
  getTotalSalesNumber(): Promise<number>;
}
