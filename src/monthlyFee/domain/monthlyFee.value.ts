import { MonthlyFeeEntity, MonthlyFeeStatuses } from "./monthlyFee.entity";
import { CreateMonthlyFeeRequest } from "./monthlyFee.validations";
import { v4 as uuid } from "uuid";

export class MonthlyFeeValue implements MonthlyFeeEntity {
  uuid: string;
  amount: number;
  customer: string;
  status: MonthlyFeeStatuses;
  month: number;
  year: number;
  createdAt: Date;
  updatedAt: Date;

  constructor({ amount, customer, month, year }: CreateMonthlyFeeRequest) {
    this.uuid = uuid();
    this.amount = amount;
    this.customer = customer;
    this.status = MonthlyFeeStatuses.PENDING;
    this.month = month;
    this.year = year;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
