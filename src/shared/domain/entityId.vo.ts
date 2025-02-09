import { v4 as uuid } from "uuid";

// ✅ Value Object para el ID
export class EntityId {
  private readonly id: string;

  private constructor(id: string) {
    this.id = id;
  }

  static create(): EntityId {
    return new EntityId(uuid());
  }

  static fromExisting(id: string): EntityId {
    return new EntityId(id);
  }

  toString(): string {
    return this.id;
  }
}
