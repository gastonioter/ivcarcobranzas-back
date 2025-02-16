import { Budget } from "../domain/budget.entity";
import { BudgetRepository } from "../domain/budget.repository";
import { BudgetModel } from "./budget.schema";

export class BudgetMongoRepository implements BudgetRepository {
  async create(budget: Budget): Promise<Budget> {
    const saved = await BudgetModel.create({
      uuid: budget.getId(),
      serie: budget.getSerie(),
      customerId: budget.getCustomerId(),
      details: budget.getDetails(),
      totalAmount: budget.getTotalAmount(),
      iva: budget.getIva(),
      createdAt: budget.getCreatedAt(),
      expiresAt: budget.getExpiresAt(),
      status: budget.getStatus(),
      sellerId: budget.getSellerId(),
      approvedAt: budget.getApprovedAt(),
    });

    return Budget.fromPersistence(saved);
  }
  async findAll(): Promise<Budget[]> {
    const budgets = await BudgetModel.find({});
    return budgets.map(Budget.fromPersistence);
  }
  async findByUuid(uuid: string): Promise<Budget> {
    const budget = await BudgetModel.findOne({ uuid });
    if (!budget) throw new Error("El presupuesto no existe");
    return Budget.fromPersistence(budget);
  }
  async update(budget: Budget): Promise<Budget> {
    const dataToUpdate = {
      status: budget.getStatus(),
      expiresAt: budget.getExpiresAt(),
      approvedAt: budget.getApprovedAt(),
    };

    const updated = await BudgetModel.findOneAndUpdate(
      { uuid: budget.getId() },
      dataToUpdate,
      {
        lean: true,
        new: true,
      },
    );

    return Budget.fromPersistence(updated);
  }

  async countOfBudgets(): Promise<number> {
    return await BudgetModel.countDocuments();
  }
}
