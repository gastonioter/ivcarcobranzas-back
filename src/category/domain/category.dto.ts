import { CategoryEntity } from "./category.entity";

export class CategoryDTO {
  uuid: string;
  name: string;
  description: string;
  createdAt: string;

  constructor(
    uuid: string,
    name: string,
    description: string,
    createdAt: Date,
  ) {
    this.uuid = uuid;
    this.name = name;
    this.description = description;
    this.createdAt = createdAt.toISOString();
  }

  static fromEntity(category: CategoryEntity): CategoryDTO {
    return new CategoryDTO(
      category.getId(),
      category.getName(),
      category.getDescription(),
      category.getCreatedAt(),
    );
  }
}
