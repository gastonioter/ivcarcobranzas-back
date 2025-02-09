import { v4 as uuid } from "uuid";
import { ValueObject } from "../domain/valueObject";

// ✅ Value Object para el UUID de las entidades

interface EntityIdProps {
  uuid: string;
}

export class EntityId extends ValueObject<EntityIdProps> {
  private constructor(props: EntityIdProps) {
    super(props);
  }

  public static create(): EntityId {
    return new EntityId({
      uuid: uuid(),
    });
  }

  static fromExisting(value: string): EntityId {
    return new EntityId({ uuid: value });
  }
}
