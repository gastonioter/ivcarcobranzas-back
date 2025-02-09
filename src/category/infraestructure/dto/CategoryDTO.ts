import { CategoryEntity } from "@/category/domain/category.entity";

export class CategoryDTO {
  name: string;
  description: string;
  uuid: string;

  constructor(id: string, name: string, description: string) {
    this.name = name;
    this.description = description;
    this.uuid = id;
  }

  static fromDomain(category: CategoryEntity): CategoryDTO {
    return new CategoryDTO(
      category.getId(),
      category.getName(),
      category.getDescription(),
    );
  }
}
