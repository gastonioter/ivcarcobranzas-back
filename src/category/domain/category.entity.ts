import { Entity } from "../../shared/domain/Entity";
import { EntityId } from "../../shared/valueObjects/entityId.vo";
import { CreateCategoryDTO } from "../application/create.usecase";

interface CategoryProps {
  uuid: EntityId;
  name: string;
  description: string;
  createdAt: Date;
}
export class Category extends Entity {
  private _name: string;
  private _description: string;
  private _createdAt: Date;

  constructor(category: CategoryProps) {
    super(category.uuid);
    this._name = category.name;
    this._description = category.description;
    this._createdAt = category.createdAt;
  }

  public static new({ name, description }: CreateCategoryDTO): Category {
    if(!name) throw new Error("La categoria debe tener nombre");
    const createdAt = new Date();
    description = description || "sin descripción";

    return new Category({
      uuid: EntityId.create(),
      name,
      description,
      createdAt,
    });
  }

  static fromPersistence(doc: any): Category {
    return new Category({
      name: doc.name,
      description: doc.description,
      createdAt: doc.createdAt,
      uuid: EntityId.fromExisting(doc.uuid),
    });
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get createdAt(): Date {
    return this._createdAt;
  }
}
