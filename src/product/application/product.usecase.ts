import { CategoryRepository } from "@/category/domain/category.repository";
import { generateSecuence } from "../../shared/utils/generateSecuence";
import { CreateEditProductDTO } from "../adapters/CreateProductDTO";
import { ProductDTO } from "../adapters/productDTO";
import { ProductEntity } from "../domain/product.entity";
import { ProducAlreadyExistsError } from "../domain/product.exceptions";
import { ProductRepository } from "../domain/product.repository";

export class ProductUseCases {
  constructor(
    private productRepo: ProductRepository,
    private categoryRepo: CategoryRepository,
  ) {}

  public createProduct = async (product: CreateEditProductDTO) => {
    const exists = await this.productRepo.findByName(product.name);

    if (exists) {
      throw new ProducAlreadyExistsError();
    }

    const category = await this.categoryRepo.findById(product.categoryId);

    if (!category) {
      throw new Error("Category not found");
    }

    const totalProductsNumber = await this.productRepo.getTotalSalesNumber();

    const productData = {
      name: product.name,
      price: product.price,
      category: category,
      code: generateSecuence(totalProductsNumber),
    };

    const newProduct = ProductEntity.new(productData);

    return await this.productRepo.save(newProduct);
  };

  public editProduct = async (
    uuid: string,
    product: Partial<ProductEntity>,
  ) => {
    return await this.productRepo.edit(uuid, product);
  };

  public listProducts = async (): Promise<ProductDTO[]> => {
    const products = await this.productRepo.list();
    return products.map((prod) => new ProductDTO(prod));
  };
}
