import { Budget, BudgetStatus } from "../domain/budget.entity";
import {
  ITransactionDTO,
  mapTransactionDTO,
} from "../../../transaction/adapers/TransactionDTO";
import { UserEntity } from "../../../user/domain/user.entity";
import { Customer } from "@/customerV2/domain/customer.entity.";

interface BudgetDTO extends ITransactionDTO {
  expiresAt?: Date;
  approvedAt?: Date;
  status: BudgetStatus;
}

export function BudgetDTO(
  budget: Budget,
  customer?: Customer,
  user?: UserEntity,
): BudgetDTO {
  return {
    ...mapTransactionDTO(budget, customer, user),
    expiresAt: budget.getExpiresAt(),
    status: budget.getStatus(),
    approvedAt: budget.getApprovedAt(),
  };
}
