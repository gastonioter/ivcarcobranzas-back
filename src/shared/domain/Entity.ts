import { EntityId } from "../valueObjects/entityId.vo";

export abstract class Entity {
  private readonly uuid: EntityId;

  constructor(uuid: EntityId) {
    this.uuid = uuid;
  }

  getId(): string {
    return this.uuid.getId();
  }

  equals(entity: Entity): boolean {
    if (this === entity) {
      return true;
    }

    return this.uuid.equals(entity.uuid);
  }
}
