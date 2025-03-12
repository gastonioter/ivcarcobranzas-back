import { Request, Response } from "express";
import { PaymentUseCases } from "../application/paymentUseCases";

export class PaymentController {
  constructor(private readonly paymentUseCases: PaymentUseCases) {}

  createPayment = async (req: Request, res: Response) => {
    const payment = await this.paymentUseCases.createPayment(req.body);
    res.status(201).json(payment);
  };
  findAllPayments = async (req: Request, res: Response) => {
    const payments = await this.paymentUseCases.findAllPayments();
    res.status(200).json(payments);
  };
}
