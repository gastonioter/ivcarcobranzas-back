import { Entity } from "../../shared/domain/Entity";
import { EntityId } from "../../shared/valueObjects/entityId.vo";
import { CreateCategoryDTO } from "../infraestructure/dto/CategoryValidations";

// ✅ Props
interface ICategory {
  name: string;
  description: string;
  createdAt: Date;
}
// ✅ Domain Entity
export class CategoryEntity extends Entity<ICategory> {
  
  constructor(entity: ICategory) {
    super(entity, EntityId.create());
  }

  /* This is called by the use case */
  public static new({ name, description }: CreateCategoryDTO): CategoryEntity {
    
    // Logica de validaciones
    const createdAt = new Date();
    description = description || "sin descripción";

    return new CategoryEntity({ name, description, createdAt });
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
