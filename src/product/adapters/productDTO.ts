import { CategoryDTO } from "../../category/adapters/CategoryDTO";
import { ProductEntity } from "../domain/product.entity";

export class ProductDTO {
  uuid: string;
  name: string;
  price: number;
  code: string;
  category: CategoryDTO;

  constructor(product: ProductEntity) {
    this.uuid = product.getId();
    this.name = product.getName();
    this.price = product.getPrice();
    this.code = product.getCode();
    this.category = new CategoryDTO(product.getCategory());
  }
}
