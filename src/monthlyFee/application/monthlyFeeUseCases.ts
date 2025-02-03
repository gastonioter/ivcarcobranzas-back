import { MonthlyFeeEntity } from "../domain/monthlyFee.entity";
import { MonthlyFeeRepository } from "../domain/monthlyFee.repository";
import { CreateMonthlyFeeRequest } from "../domain/monthlyFee.validations";
import { MonthlyFeeValue } from "../domain/monthlyFee.value";
import { MonthlyFeeDoc } from "../infraestructure/monthlyFee.schema";

export class MonthlyFeeUseCases {
  constructor(private readonly monthlyFeeRepository: MonthlyFeeRepository) {}

  public createMonthlyFee = async (monthlyFee: CreateMonthlyFeeRequest) => {
    const monthlyFeeValue = new MonthlyFeeValue(monthlyFee);
    const newMonthlyFee = await this.monthlyFeeRepository.save(monthlyFeeValue);

    return newMonthlyFee;
  };

  public findAllMonthlyFees = async () => {
    const monthlyFees = await this.monthlyFeeRepository.findAll();

    return monthlyFees;
  };
}
