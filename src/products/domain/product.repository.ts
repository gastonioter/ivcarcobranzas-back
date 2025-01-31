import { EditProductDTO } from "./dto/edit.dto";
import { ReadProductDTO } from "./dto/read.dto";
import { ProductEntity } from "./product.entity";

export interface ProductRepository {
  create(product: ProductEntity): Promise<ProductEntity | null>;
  edit(product: EditProductDTO): Promise<ProductEntity | null>;
  list(): Promise<ReadProductDTO[]>;
}
