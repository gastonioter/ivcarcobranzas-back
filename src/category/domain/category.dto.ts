import { BaseDTO } from "@/shared/adapters/BaseDTO";
import { CategoryEntity } from "./category.entity";

export interface ICategoryDTO {
  uuid: string;
  name: string;
  description: string;
  createdAt: string;
}
export class CategoryDTO extends BaseDTO<ICategoryDTO> {
  constructor(props: ICategoryDTO) {
    super(props);
  }

  static fromEntity(category: CategoryEntity): CategoryDTO {
    return new CategoryDTO({
      uuid: category.getId(),
      name: category.getName(),
      description: category.getDescription(),
      createdAt: category.getCreatedAt().toISOString(),
    });
  }
}
