import { CategoryDTO } from "../adapters/CategoryDTO";
import { CategoryAlreadyExists } from "../domain/categories.exceptions";
import { CreateCategoryDTO } from "../infraestructure/dto/CategoryValidations";
import { CategoryEntity } from "../domain/category.entity";
import { CategoryRepository } from "../domain/category.repository";

export class CategoryUseCases {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  public createCategory = async ({
    name,
    description,
  }: CreateCategoryDTO): Promise<CategoryDTO | null> => {
    // Domain Logic
    const newCategroy = CategoryEntity.new({ name, description });

    const exists = await this.categoryRepository.findByName(
      newCategroy.getName(),
    );

    if (exists) {
      throw new CategoryAlreadyExists();
    }

    const savedCategory = await this.categoryRepository.save(newCategroy);

    return savedCategory ? new CategoryDTO(savedCategory) : null;
  };

  public findAllCategories = async (): Promise<CategoryDTO[]> => {
    const categories = await this.categoryRepository.findAll();

    return categories.map((category) => {
      
      return new CategoryDTO(category);
    });
  };
}
