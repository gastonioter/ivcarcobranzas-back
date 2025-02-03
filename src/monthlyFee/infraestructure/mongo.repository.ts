import { MonthlyFeeEntity } from "../domain/monthlyFee.entity";
import { MonthlyFeeRepository } from "../domain/monthlyFee.repository";
import { MonthlyFeeModel } from "./monthlyFee.schema";

export class MonthlyFeeMongoRepository implements MonthlyFeeRepository {
  
  async save(monthlyFee: MonthlyFeeEntity): Promise<MonthlyFeeEntity | null> {
    const newMonthlyFee = await MonthlyFeeModel.create(monthlyFee);
    await newMonthlyFee.save();
    return newMonthlyFee;
  }

  async findAll(): Promise<MonthlyFeeEntity[]> {
    return await MonthlyFeeModel.find();
  }
}
