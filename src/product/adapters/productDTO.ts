import { CategoryEntity } from "../../category/domain/category.entity";
import { CategoryDTO } from "../../category/adapters/CategoryDTO";
import { ProductEntity } from "../domain/product.entity";

export class ProductDTO {
  uuid: string;
  name: string;
  price: number;
  code: string;
  category: CategoryDTO;

  constructor({
    id,
    name,
    price,
    category,
    code,
  }: {
    id: string;
    name: string;
    price: number;
    category: CategoryDTO;
    code: string;
  }) {
    this.uuid = id;
    this.name = name;
    this.price = price;
    this.code = code;
    this.category = category;
  }

  static fromEntity(product: ProductEntity): ProductDTO {
    console.log(product);
    return new ProductDTO({
      name: product.getName(),
      price: product.getPrice(),
      code: product.getCode(),
      id: product.getId(),
      category: new CategoryDTO(product.getCategory()),
    });
  }
}
