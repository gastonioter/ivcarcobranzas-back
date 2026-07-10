import { Product } from "./product.entity";

export interface ProductWithCategory extends Product {
  category: { uuid: string; name: string; description: string };
}

export interface ProductRepository {
  save(uuid: string, product: Product): Promise<void>;
  findById(uuid: string): Promise<Product | null>;
  // findAll(): Promise<Product[]>;
  findAllWithCategory(): Promise<ProductWithCategory[]>;
  findByName(name: string): Promise<Product | null>;
  count(): Promise<number>;
}
