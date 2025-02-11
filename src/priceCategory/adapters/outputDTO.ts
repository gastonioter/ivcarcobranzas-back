import { PriceCategory } from "../domain/priceCategory.entity";

export class PriceCategoryDTO {
  uuid: string;
  name: string;
  description: string;
  price: number;

  constructor(entity: PriceCategory) {
    this.uuid = entity.getId();
    this.name = entity.getName();
    this.description = entity.getDescription();
    this.price = entity.getPrice();
  }
}
