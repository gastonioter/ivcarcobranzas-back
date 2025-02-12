import { CloudCategory } from "./cloudCategory.entity";

export interface PriceCategoryRepo {
  findAll(): Promise<CloudCategory[]>;
  findById(uuid: string): Promise<CloudCategory>;
  save(category: CloudCategory): Promise<CloudCategory>;
  update(category: CloudCategory): Promise<CloudCategory>;
  delete(uuid: string): Promise<void>;
}
