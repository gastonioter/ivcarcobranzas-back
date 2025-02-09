import { CategoryRepository } from "@/category/domain/category.repository";
import { generateSecuence } from "../../shared/utils/generateSecuence";
import { CreateProductDTO } from "../adapters/CreateProductDTO";
import { ProductEntity } from "../domain/product.entity";
import { ProducAlreadyExistsError } from "../domain/product.exceptions";
import { ProductRepository } from "../domain/product.repository";
import { EditProductSchemaType } from "../domain/product.validations";
import { ProductDTO } from "../adapters/productDTO";

export class ProductUseCases {
  constructor(
    private productRepo: ProductRepository,
    private categoryRepo: CategoryRepository,
  ) {}

  public createProduct = async (product: CreateProductDTO) => {
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
      ...product,
      category: category,
      code: generateSecuence(totalProductsNumber),
    };

    const newProduct = ProductEntity.new(
      productData.name,
      productData.price,
      productData.code,
      productData.category,
      new Date(),
    );
    return await this.productRepo.save(newProduct);
  };

  public editProduct = async (uuid: string, product: EditProductSchemaType) => {
    return await this.productRepo.edit(uuid, product);
  };

  public listProducts = async (): Promise<ProductDTO[]> => {
    const products = await this.productRepo.list();
    return products.map((prod) => ProductDTO.fromEntity(prod));
  };
}
