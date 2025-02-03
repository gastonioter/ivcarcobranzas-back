import { Request, Response } from "express";
import { MonthlyFeeUseCases } from "../application/monthlyFeeUseCases";

export class MonthlyFeeController {
  constructor(private readonly monthlyFeeUseCases: MonthlyFeeUseCases) {}

  createMonthlyFee = async (req: Request, res: Response) => {
    const monthlyFee = req.body;
    const newMonthlyFee = await this.monthlyFeeUseCases.createMonthlyFee(
      monthlyFee
    );
    res.status(200).send(newMonthlyFee);
  };

  findAllMonthlyFees = async (req: Request, res: Response) => {
    const monthlyFees = await this.monthlyFeeUseCases.findAllMonthlyFees();
    res.status(200).send(monthlyFees);
  };
}
