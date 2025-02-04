import { ProducEntityWithCategories, ProductEntity } from "./product.entity";
import { EditProductSchemaType } from "./product.validations";

export interface ProductRepository {
  create(product: ProductEntity): Promise<ProductEntity | null>;
  findByName(name: string): Promise<ProductEntity | null>;
  edit(product: EditProductSchemaType): Promise<ProductEntity | null>;
  list(): Promise<ProducEntityWithCategories[]>;
  getTotalSalesNumber(): Promise<number>;
}
