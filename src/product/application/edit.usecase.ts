import { ProducAlreadyExistsError, ProductNotFoundError } from "../domain/product.exceptions";
import { ProductRepository } from "../domain/product.repository";
import { Product } from "../domain/product.entity";

export interface EditProductDTO {
  name?: string;
  price?: number;
  categoryId?: string;
}

export class EditProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(uuid: string, dto: EditProductDTO): Promise<Product> {
    const product = await this.productRepository.findById(uuid);
    if (!product) throw new ProductNotFoundError();

    if (dto.name && dto.name !== product.name) {
      const conflict = await this.productRepository.findByName(dto.name);
      if (conflict) throw new ProducAlreadyExistsError();
      product.name = dto.name;
    }

    if (dto.price !== undefined) {
      product.price = dto.price;
    }

    if (dto.categoryId !== undefined) {
      product.categoryId = dto.categoryId;
    }

    await this.productRepository.save(product.getId(), product);
    return product;
  }
}
