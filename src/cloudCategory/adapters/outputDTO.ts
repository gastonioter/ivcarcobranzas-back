import { CloudCategory } from "../domain/cloudCategory.entity";

export class PriceCategoryDTO {
  uuid: string;
  name: string;
  description: string;
  price: number;

  constructor(entity: CloudCategory) {
    this.uuid = entity.getId();
    this.name = entity.getName();
    this.description = entity.getDescription();
    this.price = entity.getPrice();
  }
}
