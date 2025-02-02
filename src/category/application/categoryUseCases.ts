import { CategoryAlreadyExists } from "../domain/categories.exceptions";
import { CreateCategoryDTO } from "../domain/categories.validations";
import { CategoryRepository } from "../domain/category.repository";
import { CategoryValue } from "../domain/category.value";

export class CategoryUseCases {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  public createCategory = async (category: CreateCategoryDTO) => {
    const categoryValue = new CategoryValue(category);
    const exists = await this.categoryRepository.findByName(categoryValue.name);

    if (exists) {
      throw new CategoryAlreadyExists();
    }

    return this.categoryRepository.create(categoryValue);
  };

  public findAllCategories = async () => {
    return this.categoryRepository.findAll();
  };
}
