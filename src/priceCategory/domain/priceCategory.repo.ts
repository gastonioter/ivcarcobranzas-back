import { PriceCategory } from "./priceCategory.entity";

export interface PriceCategoryRepo {
  findAll(): Promise<PriceCategory[]>;
  findById(uuid: string): Promise<PriceCategory>;
  save(category: PriceCategory): Promise<PriceCategory>;
  update(category: PriceCategory): Promise<PriceCategory>;
  delete(uuid: string): Promise<void>;
}
