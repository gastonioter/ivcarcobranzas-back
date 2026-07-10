import { Entity } from "../../shared/domain/Entity";
import { EntityId } from "../../shared/valueObjects/entityId.vo";
import { Price } from "../../shared/valueObjects/price.vo";

export interface ProductDTO {
  uuid: string;
  name: string;
  code: string;
  price: number;
  categoryId: string;
}

interface ProductProps {
  uuid: EntityId;
  name: string;
  price: Price;
  code: string;
  categoryId: string;
  createdAt: Date;
}

export class Product extends Entity {
  private _name: string;
  private _price: Price;
  private _code: string;
  private _categoryId: string;
  private _createdAt: Date;

  private constructor(product: ProductProps) {
    super(product.uuid);
    this._name = product.name;
    this._price = product.price;
    this._code = product.code;
    this._categoryId = product.categoryId;
    this._createdAt = product.createdAt;
  }

  static new({
    categoryId,
    name,
    price,
    code,
  }: {
    categoryId: string;
    name: string;
    price: number;
    code: string;
  }): Product {
    if (!categoryId) throw new Error("El producto debe tener una categoria.");
    if (!name || name.trim().length === 0)
      throw new Error("El nombre del producto no puede estar vacío");
    if (!code || code.trim().length === 0)
      throw new Error("El código del producto no puede estar vacío");

    return new Product({
      uuid: EntityId.create(),
      name: name.trim(),
      price: Price.of(price),
      code: code.trim(),
      categoryId,
      createdAt: new Date(),
    });
  }

  toDTO(): ProductDTO {
    return {
      uuid: this.getId(),
      name: this.name,
      price: this.price.value,
      code: this.code,
      categoryId: this.categoryId,
    };
  }

  static fromPersistence(obj: any): Product {
    return new Product({
      name: obj.name,
      price: Price.fromPersistence(obj.price),
      code: obj.code,
      createdAt: obj.createdAt,
      uuid: EntityId.fromExisting(obj.uuid),
      categoryId: obj.categoryId,
    });
  }

  get name(): string {
    return this._name;
  }
  set name(value: string) {
    if (!value || value.trim().length === 0)
      throw new Error("El nombre del producto no puede estar vacío");
    this._name = value.trim();
  }

  get price(): Price {
    return this._price;
  }
  set price(value: number) {
    this._price = Price.of(value);
  }

  get code(): string {
    return this._code;
  }
  get categoryId(): string {
    return this._categoryId;
  }
  set categoryId(value: string) {
    if (!value || value.trim().length === 0)
      throw new Error("El producto debe tener una categoria.");
    this._categoryId = value.trim();
  }

  get createdAt(): Date {
    return this._createdAt;
  }
}
