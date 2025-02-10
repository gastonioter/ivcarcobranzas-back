import { CategoryEntity } from "../../category/domain/category.entity";
import { Entity } from "../../shared/domain/Entity";
import { EntityId } from "../../shared/valueObjects/entityId.vo";

interface IProduct {
  uuid: EntityId;
  name: string;
  price: number;
  code: string;
  category: CategoryEntity;
  createdAt: Date;
}

export class ProductEntity extends Entity {
  private name: string;
  private price: number;
  private code: string;
  private category: CategoryEntity;
  private createdAt: Date;

  constructor(product: IProduct) {
    super(product.uuid);
    this.name = product.name;
    this.price = product.price;
    this.code = product.code;
    this.category = product.category;
    this.createdAt = product.createdAt;
  }

  public static new({
    category,
    name,
    price,
    code,
  }: {
    category: CategoryEntity;
    name: string;
    price: number;
    code: string;
  }): ProductEntity {
    return new ProductEntity({
      uuid: EntityId.create(),
      name,
      price,
      code,
      category,
      createdAt: new Date(),
    });
  }

  static fromPersistence(obj: any): ProductEntity {
    return new ProductEntity({
      name: obj.name,
      price: obj.price,
      code: obj.code,
      createdAt: obj.createdAt,
      uuid: EntityId.fromExisting(obj.uuid),
      category: CategoryEntity.fromPersistence(obj.category),
    });
  }

  getName(): string {
    return this.name;
  }
  getPrice(): number {
    return this.price;
  }
  getCode(): string {
    return this.code;
  }
  getCategory(): CategoryEntity {
    return this.category;
  }
  getCreatedAt(): Date {
    return this.createdAt;
  }
}
