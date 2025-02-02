import { CategoryEntity } from "@/category/domain/category.entity";

export interface ProductEntity {
  uuid: string;
  name: string;
  price: number;
  code: string;
  categoryId: string;
}

export type ProducEntityWithCategories = ProductEntity & {
  category: CategoryEntity;
};
