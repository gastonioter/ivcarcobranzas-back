import { CreateProductDTO } from "../domain/dto";
import { EditProductDTO } from "../domain/dto/edit.dto";
import { ProductRepository } from "../domain/product.repository";
import { ProductValue } from "../domain/product.value";

export class ProductUseCases {
  constructor(private productRepository: ProductRepository) {}

  public createProduct = async (product: CreateProductDTO) => {
    const productValue = new ProductValue(product);

    const newProduct = await this.productRepository.create(productValue);

    return newProduct;
  };

  public editProduct = async (product: EditProductDTO) => {
    return await this.productRepository.edit(product);
  };

  public listProducts = async () => {
    return await this.productRepository.list();
  };
}
