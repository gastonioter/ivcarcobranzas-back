import { BudgetRepository } from "../domain/budget.repository";

export class BudgetUseCases {
  constructor(private readonly budgetRepository: BudgetRepository) {}

  async createBudget(budget: any) {
    return this.budgetRepository.create(budget);
  }

  async getDetails(uuid: string) {
    return this.budgetRepository.findByUuid(uuid);
  }

  async listBudgets() {
    return this.budgetRepository.findAll();
  }

  async updateStatus(uuid: string, status: string) {
    const budget = await this.budgetRepository.findByUuid(uuid);
    //budget.status = status;
    return this.budgetRepository.update(budget);
  }
}
