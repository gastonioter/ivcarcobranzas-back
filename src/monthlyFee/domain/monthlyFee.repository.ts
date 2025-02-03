import { MonthlyFeeEntity, MonthlyFeeStatuses } from "./monthlyFee.entity";

export interface MonthlyFeeRepository {
  save(monthlyFee: MonthlyFeeEntity): Promise<MonthlyFeeEntity | null>;
  findAll(): Promise<MonthlyFeeEntity[]>;
  changeStatus(
    uuid: string,
    status: MonthlyFeeStatuses
  ): Promise<MonthlyFeeEntity | null>;
}
