import { CategoryAlreadyExists } from "../domain/categories.exceptions";
import { Category } from "../domain/category.entity";
import { CategoryRepository } from "../domain/category.repository";

export interface CreateCategoryDTO {
    name: string;
    description: string;
}

export class CreateUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

    async execute(dto: CreateCategoryDTO): Promise<Category> {
        const exists = await this.categoryRepository.findByName(dto.name);
        if (exists) throw new CategoryAlreadyExists();
        
        const category = Category.new(dto);
        await this.categoryRepository.save(category.id, category);
        return category;
    }
}