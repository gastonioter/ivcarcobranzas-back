import { v4 as uuid } from "uuid";
import { ProductEntity } from "./product.entity";
import { CreateProductSchemaType } from "./product.validations";

export class ProductValue implements ProductEntity {
  uuid: string;
  name: string;
  price: number;
  code: string;
  categoryId: string;

  constructor({
    name,
    price,
    categoryId,
    code,
  }: CreateProductSchemaType & { code: string }) {
    this.uuid = uuid();
    this.name = name;
    this.price = price;
    this.code = code;
    this.categoryId = categoryId;
  }
}
