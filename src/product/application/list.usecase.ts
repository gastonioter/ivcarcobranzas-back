import { ProductDTO } from "../domain/product.entity";
import { ProductRepository } from "../domain/product.repository";

interface ProductWithCategoryDTO extends ProductDTO {
  category: { name: string };
}
export class ListProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(): Promise<ProductWithCategoryDTO[]> {
    const products = await this.productRepository.findAllWithCategory();
    console.log(products);
    return products.map((product) => ({
      uuid: product.id,
      name: product.name,
      code: product.code,
      price: product.price.value,
      categoryId: product.categoryId,
      category: {
        name: product.category.name,
      },
    }));
  }
}
