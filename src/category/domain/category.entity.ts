import { EntityId } from "../../shared/domain/entityId.vo";

// ✅ Entity
export class CategoryEntity {
  private uuid: string;
  private name: string;
  private description?: string;
  private createdAt: Date;

  constructor(
    uuid: string,
    name: string,
    createdAt: Date,
    description?: string,
  ) {
    this.uuid = uuid;
    this.name = name;
    this.createdAt = createdAt;
    this.description = description;
  }

  static new(name: string, description?: string): CategoryEntity {
    const uuid = EntityId.create(); // Generar UUID
    return new CategoryEntity(uuid.toString(), name, new Date(), description);
  }

  static fromPersistence(data: any): CategoryEntity {
    return new CategoryEntity(
      data.uuid,
      data.name,
      new Date(data.createdAt),
      data.description,
    );
  }

  getId(): string {
    return this.uuid;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description ?? "no description";
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }
}
