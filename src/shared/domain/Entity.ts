import { EntityId } from "../valueObjects/entityId.vo";

export abstract class Entity<T> {
  private readonly uuid: EntityId;
  protected readonly props: T;

  constructor(props: T, uuid?: EntityId) {
    this.props = props;
    this.uuid = uuid || EntityId.create();
  }

  getId(): string {
    return this.uuid.getId();
  }

  equals(entity: Entity<T>): boolean {
    if (this === entity) {
      return true;
    }

    return this.uuid.equals(entity.uuid);
  }
}
