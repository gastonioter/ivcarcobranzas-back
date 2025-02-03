export interface MonthlyFeeEntity {
  uuid: string;
  amount: number;
  customer: string;
  status: MonthlyFeeStatuses;
  month: number;
  year: number;

  createdAt: Date;
  updatedAt: Date;
}

export enum MonthlyFeeStatuses {
  PENDING = "PENDING",
  PAID = "PAID",
  LATE = "LATE",
}
