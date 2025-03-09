import { Request, Response } from "express";
import { CuotaUseCases } from "../application/cuotaUseCases";

export class CuotaController {
  constructor(private readonly cuotaUseCases: CuotaUseCases) {}
  async createCuota(req: Request, res: Response) {
    const { amount, customerId, month, year, status } = req.body;
    const cuota = await this.cuotaUseCases.addCuotaToCustomer({
      amount,
      customerId,
      month,
      year,
      status,
    });
    res.status(201).json(cuota);
  }

  async getCuotas(req: Request, res: Response) {
    const cuotas = await this.cuotaUseCases.getCuotas(req.params.customerId);
    res.status(200).json(cuotas);
  }

  async updateCuotasStatus(req: Request, res: Response) {
    const { cuotasId, customerId, status } = req.body;

    const cuotas = await this.cuotaUseCases.updateCuotasStatus(
      cuotasId,
      customerId,
      status,
    );
    res.status(200).json(cuotas);
  }
}
