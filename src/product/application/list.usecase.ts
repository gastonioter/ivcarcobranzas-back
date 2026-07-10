import { ProductRepository, ProductWithCategory } from "../domain/product.repository";

export class ListProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(): Promise<ProductWithCategory[]> {
    return this.productRepository.findAllWithCategory();
  }
}
