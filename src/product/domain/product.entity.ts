import { CategoryEntity } from "../../category/domain/category.entity";
import { EntityId } from "../../shared/valueObjects/entityId.vo";

export type ProducEntityWithCategories = ProductEntity & {
  category: CategoryEntity;
};

export class ProductEntity {
  private uuid: string;
  private name: string;
  private price: number;
  private code: string;
  private category: CategoryEntity;
  private createdAt: Date;

  constructor(
    uuid: string,
    name: string,
    price: number,
    code: string,
    category: CategoryEntity,
    createdAt: Date,
  ) {
    this.uuid = uuid;
    this.name = name;
    this.price = price;
    this.code = code;
    this.category = category;
    this.createdAt = createdAt;
  }

  static new(
    name: string,
    price: number,
    code: string,
    category: CategoryEntity,
    createdAt: Date,
  ): ProductEntity {
    return new ProductEntity(
      EntityId.create().toString(),
      name,
      price,
      code,
      category,
      createdAt,
    );
  }

  static fromPersistence(data: any): ProductEntity {
    return new ProductEntity(
      data.uuid,
      data.name,
      data.price,
      data.code,
      new CategoryEntity(data.categoryData),
      new Date(data.createdAt),
    );
  }

  getId(): string {
    return this.uuid;
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
