import { Entity } from "../../shared/domain/Entity";
import { EntityId } from "../../shared/valueObjects/entityId.vo";

export class PriceCategory extends Entity {
  name: string;
  description: string;
  price: number;

  constructor(
    uuid: EntityId,
    name: string,
    price: number,
    description: string,
  ) {
    super(uuid);
    this.name = name;
    this.description = description;
    this.price = price;
  }

  static create(
    name: string,
    price: number,
    description?: string,
  ): PriceCategory {
    return new PriceCategory(
      EntityId.create(),
      name,
      price,
      description ?? "sin descripción",
    );
  }

  static fromPersistence(obj: any): PriceCategory {
    console.log(obj);
    return new PriceCategory(
      EntityId.fromExisting(obj.uuid),
      obj.name,
      obj.price,
      obj.description,
    );
  }

  update(newData: Partial<PriceCategory>): PriceCategory {
    return new PriceCategory(
      EntityId.fromExisting(this.getId()),
      newData.name ?? this.name,
      newData.price ?? this.price,
      newData.description ?? this.description,
    );
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  getPrice(): number {
    return this.price;
  }
}
