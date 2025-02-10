import { CreateEditProductDTO } from "../adapters/CreateProductDTO";
import { ProductEntity } from "./product.entity";

export interface ProductRepository {
  save(product: ProductEntity): Promise<ProductEntity | null>;
  findByName(name: string): Promise<ProductEntity | null>;
  edit(
    uuid: string,
    product: Partial<ProductEntity>,
  ): Promise<ProductEntity | null>;
  list(): Promise<ProductEntity[]>;
  getTotalSalesNumber(): Promise<number>;
}
