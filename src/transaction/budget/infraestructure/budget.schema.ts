import { Schema } from "mongoose";
import { BudgetStatus } from "../domain/budget.entity";
import {
  ITransaction,
  TransactionModel,
} from "../../infraestructure/transaction.schema";

export const budgetSchema = new Schema<IBudget>({
  status: { type: String, enum: Object.values(BudgetStatus), required: true },
  approvedAt: { type: Date },
  expiresAt: { type: Date },
});

export interface IBudget extends ITransaction {
  status: BudgetStatus;
  approvedAt: Date;
  expiresAt: Date;
}

export const BudgetModel = TransactionModel.discriminator(
  "Budget",
  budgetSchema,
);
