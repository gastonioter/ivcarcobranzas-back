import { Budget } from "./budget.entity";

export interface BudgetRepository {
  create(budget: Budget): Promise<Budget>;
  findAll(): Promise<Budget[]>;
  findByUuid(uuid: string): Promise<Budget>;
  update(budget: Budget): Promise<Budget>;
  countOfBudgets(): Promise<number>;
}
