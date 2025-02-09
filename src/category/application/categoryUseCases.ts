import { CategoryAlreadyExists } from "../domain/categories.exceptions";
import { CreateCategoryDTO } from "../domain/categories.validations";
import { CategoryEntity } from "../domain/category.entity";
import { CategoryRepository } from "../domain/category.repository";
import { CategoryValue } from "../domain/category.value";
import { CategoryDTO } from "../infraestructure/dto/CategoryDTO";

export class CategoryUseCases {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  public createCategory = async ({
    name,
    description,
  }: CreateCategoryDTO): Promise<CategoryDTO | null> => {
    const newCategroy = CategoryEntity.new(name, description);

    const exists = await this.categoryRepository.findByName(
      newCategroy.getName(),
    );

    if (exists) {
      throw new CategoryAlreadyExists();
    }

    const savedCategory = await this.categoryRepository.save(newCategroy);

    return savedCategory ? CategoryDTO.fromDomain(savedCategory) : null;
  };

  public findAllCategories = async (): Promise<CategoryDTO[]> => {
    const categories = await this.categoryRepository.findAll();

    return categories.map((category) => {
      return CategoryDTO.fromDomain(category);
    });
  };
}
