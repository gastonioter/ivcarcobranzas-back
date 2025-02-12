import {
  CreatePriceCategoryDTO,
  EditPriceCategoryDTO,
} from "../adapters/createDTO";
import { PriceCategoryDTO } from "../adapters/outputDTO";
import { CloudCategory } from "../domain/cloudCategory.entity";
import { PriceCategoryRepo } from "../domain/cloudCategory.repo";

export class CloudCategoryUseCases {
  constructor(private priceCategoryRepository: PriceCategoryRepo) {}

  async create(
    cloudCategory: CreatePriceCategoryDTO,
  ): Promise<PriceCategoryDTO> {
    const newPriceCategory = CloudCategory.create(
      cloudCategory.name,
      cloudCategory.price,
      cloudCategory.description,
    );
    const saved = await this.priceCategoryRepository.save(newPriceCategory);
    return new PriceCategoryDTO(saved);
  }

  async getById(id: string): Promise<CloudCategory> {
    return await this.priceCategoryRepository.findById(id);
  }

  async getAll(): Promise<PriceCategoryDTO[]> {
    const categories = await this.priceCategoryRepository.findAll();
    return categories.map((category) => new PriceCategoryDTO(category));
  }

  async update(data: EditPriceCategoryDTO): Promise<PriceCategoryDTO> {
    const previousData = await this.priceCategoryRepository.findById(data.uuid);
    if (!previousData) {
      throw new Error("Category price not found");
    }

    const updated = previousData.update(data);

    const saved = await this.priceCategoryRepository.update(updated);

    return new PriceCategoryDTO(saved);
  }

  async delete(id: string): Promise<void> {
    await this.priceCategoryRepository.delete(id);
  }
}
