import { v4 as uuid } from "uuid";
import { CreateCategoryDTO } from "./categories.validations";
import { CategoryEntity } from "./category.entity";

export class CategoryValue implements CategoryEntity {
  uuid: string;
  name: string;
  description?: string;
  createdAt: Date;

  constructor({ name, description = "" }: CreateCategoryDTO) {
    this.uuid = uuid();
    this.name = name;
    this.description = description;
    this.createdAt = new Date();
  }
}
