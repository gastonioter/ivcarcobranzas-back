import { MonthlyFeeEntity } from "./monthlyFee.entity";

export interface MonthlyFeeRepository {
  save(monthlyFee: MonthlyFeeEntity): Promise<MonthlyFeeEntity | null>;
  findAll(): Promise<MonthlyFeeEntity[]>;
}
