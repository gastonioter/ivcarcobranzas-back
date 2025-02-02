import { ProducEntityWithCategories, ProductEntity } from "./product.entity";
import { EditProductSchemaType } from "./product.validations";

export interface ProductRepository {
  create(product: ProductEntity): Promise<ProductEntity | null>;
  edit(product: EditProductSchemaType): Promise<ProductEntity | null>;
  list(): Promise<ProducEntityWithCategories[]>;
}
