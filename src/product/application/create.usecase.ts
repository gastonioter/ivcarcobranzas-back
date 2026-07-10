import { generateSecuence } from "../../shared/utils/generateSecuence";
import { ProducAlreadyExistsError } from "../domain/product.exceptions";
import { ProductRepository } from "../domain/product.repository";
import { Product, ProductDTO } from "../domain/product.entity";

export interface CreateProductDTO {
  name: string;
  price: number;
  categoryId: string;
}

export class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(dto: CreateProductDTO): Promise<ProductDTO> {
    const exists = await this.productRepository.findByName(dto.name);
    if (exists) throw new ProducAlreadyExistsError();

    const count = await this.productRepository.count();
    const code = generateSecuence(count + 1);

    const product = Product.new({
      name: dto.name,
      price: dto.price,
      categoryId: dto.categoryId,
      code,
    });

    await this.productRepository.save(product.getId(), product);
    return product.toDTO();
  }
}
