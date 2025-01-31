import { CreateCategoryDto } from "./dto/create.dto";
import { v4 as uuid } from "uuid";

export class CategoryValue {
  uuid: string;
  name: string;
  description?: string | null;

  constructor({ name, description = "" }: CreateCategoryDto) {
    this.uuid = uuid();
    this.name = name;
    this.description = description;
  }
}
