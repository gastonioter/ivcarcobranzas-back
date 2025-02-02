import { ProductRepository } from "../domain/product.repository";
import {
  CreateProductSchemaType,
  EditProductSchemaType,
} from "../domain/product.validations";
import { ProductValue } from "../domain/product.value";

export class ProductUseCases {
  constructor(private productRepository: ProductRepository) {}

  public createProduct = async (product: CreateProductSchemaType) => {
    const productValue = new ProductValue(product);

    const newProduct = await this.productRepository.create(productValue);

    return newProduct;
  };

  public editProduct = async (product: EditProductSchemaType) => {
    return await this.productRepository.edit(product);
  };

  public listProducts = async () => {
    return await this.productRepository.list();
  };
}
