import { CategoryAlreadyExists } from "../domain/categories.exceptions";
import { CategoryRepository } from "../domain/category.repository";
import { CategoryValue } from "../domain/category.value";
import { CreateCategoryDto } from "../domain/dto/create.dto";

export class CategoryUseCases {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  public createCategory = async (category: CreateCategoryDto) => {
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
