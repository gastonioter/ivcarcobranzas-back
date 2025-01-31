import { v4 as uuid } from "uuid";
import { CreateProductDTO } from "./dto";
import { ProductEntity } from "./product.entity";

export class ProductValue implements ProductEntity {
  uuid: string;
  name: string;
  price: number;
  code: string;
  categoryId: string;

  private static counter = 6;

  constructor({ name, price, categoryId }: CreateProductDTO) {
    this.uuid = uuid();
    this.name = name;
    this.price = price;
    this.code = ProductValue.generateCode();
    this.categoryId = categoryId;

    ProductValue.counter++;
  }

  private static generateCode(): string {
    return String(this.counter).padStart(5, "0");
  }
}
