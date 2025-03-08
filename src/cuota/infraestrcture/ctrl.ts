import { Request, Response } from "express";
import { CuotaUseCases } from "../application/cuotaUseCases";

export class CuotaController {
  constructor(private readonly cuotaUseCases: CuotaUseCases) {}
  async createCuota(req: Request, res: Response) {
    const { amount, customerId } = req.body;
    const cuota = await this.cuotaUseCases.addCuotaToCustomer({
      amount,
      customerId,
    });
    res.status(201).json(cuota);
  }

  async getCuotas(req: Request, res: Response) {
    const cuotas = await this.cuotaUseCases.getCuotas();
    res.status(200).json(cuotas);
  }
}
