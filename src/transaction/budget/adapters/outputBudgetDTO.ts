import { CustomerEntity } from "../../../customer/domain/customer.entity";
import { Budget, BudgetStatus } from "../domain/budget.entity";
import {
  ITransactionDTO,
  mapTransactionDTO,
} from "../../../transaction/adapers/TransactionDTO";
import { UserEntity } from "../../../user/domain/user.entity";

interface BudgetDTO extends ITransactionDTO {
  expiresAt?: Date;
  approvedAt?: Date;
  status: BudgetStatus;
}

export function BudgetDTO(
  budget: Budget,
  customer?: CustomerEntity,
  user?: UserEntity,
): BudgetDTO {
  return {
    ...mapTransactionDTO(budget, customer, user),
    expiresAt: budget.getExpiresAt(),
    status: budget.getStatus(),
    approvedAt: budget.getApprovedAt(),
  };
}
