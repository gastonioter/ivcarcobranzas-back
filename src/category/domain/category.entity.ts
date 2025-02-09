import { Entity } from "../../shared/domain/Entity";
import { EntityId } from "../../shared/valueObjects/entityId.vo";
import { CreateCategoryDTO } from "./categories.validations";

// ✅ Props
interface CategoryProps {
  name: string;
  description: string;
  createdAt: Date;
}
// ✅ Domain Entity
export class CategoryEntity extends Entity<CategoryProps> {
  constructor(props: CategoryProps) {
    super(props, EntityId.create());
  }

  public static new({
    name,
    description = "sin descripción",
  }: CreateCategoryDTO): CategoryEntity {
    const createdAt = new Date();

    return new CategoryEntity({ name, description, createdAt });
  }

  static fromPersistence(data: any): CategoryEntity {
    return new CategoryEntity({
      name: data.name,
      description: data.description,
      createdAt: new Date(data.createdAt),
    });
  }

  getName(): string {
    return this.props.name;
  }

  getDescription(): string {
    return this.props.description;
  }

  getCreatedAt(): Date {
    return this.props.createdAt;
  }
}
