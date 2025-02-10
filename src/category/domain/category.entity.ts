import { Entity } from "../../shared/domain/Entity";
import { EntityId } from "../../shared/valueObjects/entityId.vo";
import { CreateCategoryDTO } from "../infraestructure/dto/CategoryValidations";

interface ICategory {
  uuid: EntityId;
  name: string;
  description: string;
  createdAt: Date;
}
export class CategoryEntity extends Entity {
  private name: string;
  private description: string;
  private createdAt: Date;

  constructor(category: ICategory) {
    super(category.uuid);
    this.name = category.name;
    this.description = category.description;
    this.createdAt = category.createdAt;
  }

  public static new({ name, description }: CreateCategoryDTO): CategoryEntity {
    const createdAt = new Date();
    description = description || "sin descripción";

    return new CategoryEntity({
      name,
      description,
      createdAt,
      uuid: EntityId.create(),
    });
  }

  static fromPersistence(doc: any): CategoryEntity {
    return new CategoryEntity({
      name: doc.name,
      description: doc.description,
      createdAt: doc.createdAt,
      uuid: EntityId.fromExisting(doc.uuid),
    });
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }
}
