import { createTransactionSchema } from "@/transaction/infraestructure/transaction.dto";
import z from "zod";
import { BudgetStatus } from "../../budget/domain/budget.entity";

const createBudgetSchema = createTransactionSchema.extend({});
const EditBudgetSchema = z.object({
  status: z.nativeEnum(BudgetStatus),
});
export type createBudgetDTO = z.infer<typeof createBudgetSchema>;

export type editBudgetDTO = z.infer<typeof EditBudgetSchema>;
