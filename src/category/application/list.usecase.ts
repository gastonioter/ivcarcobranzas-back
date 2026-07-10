import { Category } from "../domain/category.entity";
import { CategoryRepository } from "../domain/category.repository";

export class ListUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

    async execute(): Promise<Category[]> {
        const categories = await this.categoryRepository.findAll();
        return categories;
    }
}