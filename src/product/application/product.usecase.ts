import { generateSecuence } from "../../shared/utils/generateSecuence";
import { ProducAlreadyExistsError } from "../domain/product.exceptions";
import { ProductRepository } from "../domain/product.repository";
import {
  CreateProductSchemaType,
  EditProductSchemaType,
} from "../domain/product.validations";
import { ProductValue } from "../domain/product.value";

export class ProductUseCases {
  constructor(private productRepository: ProductRepository) {}

  public createProduct = async (product: CreateProductSchemaType) => {
    const exists = await this.productRepository.findByName(product.name);

    if (exists) {
      throw new ProducAlreadyExistsError();
    }
    const totalProductsNumber =
      await this.productRepository.getTotalSalesNumber();

    const productData = {
      ...product,
      code: generateSecuence(totalProductsNumber),
    };
    const productValue = new ProductValue(productData);

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
