import { Request, Response } from "express";
import { BudgetUseCases } from "../application/budgetUseCases";

export class BudgetController {
  constructor(private readonly budgetUseCases: BudgetUseCases) {}

  async create(req: Request, res: Response) {
    const budget = await this.budgetUseCases.createBudget(req.body);
    res.status(201).send(budget);
  }
  async getDetails(req: Request, res: Response) {
    const { uuid } = req.params;
    const budget = await this.budgetUseCases.getDetails(uuid);
    res.status(200).send(budget);
  }
  async list(req: Request, res: Response) {
    const budgets = await this.budgetUseCases.listBudgets();
    res.status(200).send(budgets);
  }

  async updateStatus(req: Request, res: Response) {
    const { uuid } = req.params;
    const { status } = req.body;
    const budget = await this.budgetUseCases.updateStatus(uuid, status);
    res.status(200).send(budget);
  }
}
