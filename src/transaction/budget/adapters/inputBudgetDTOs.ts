import { createTransactionSchema } from "../../../transaction/infraestructure/transaction.dto";
import z from "zod";
import { BudgetStatus } from "../domain/budget.entity";

export const CreateBudgetSchema = createTransactionSchema.extend({
  expiresAt: z.date().optional(),
});

export const EditBudgetSchema = z.object({
  status: z.nativeEnum(BudgetStatus).optional(),
});
export type CreateBudgetDTO = z.infer<typeof CreateBudgetSchema>;

export type EditBudgetDTO = z.infer<typeof EditBudgetSchema>;
