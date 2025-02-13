import { CustomerEntity } from "../../../customer/domain/customer.entity";
import { Budget, BudgetStatus } from "../domain/budget.entity";
import {
  ITransactionDTO,
  mapTransactionDTO,
} from "../../../transaction/adapers/TransactionDTO";

interface BudgetDTO extends ITransactionDTO {
  expiresAt?: Date;
  approvedAt?: Date;
  status: BudgetStatus;
}

export function BudgetDTO(
  budget: Budget,
  customer?: CustomerEntity,
): BudgetDTO {
  return {
    ...mapTransactionDTO(budget, customer),
    expiresAt: budget.getExpiresAt(),
    status: budget.getStatus(),
    approvedAt: budget.getAppovedAt(),
  };
}
