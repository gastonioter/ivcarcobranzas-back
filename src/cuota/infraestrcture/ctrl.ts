import { Request, Response } from "express";
import { CuotaUseCases } from "../application/cuotaUseCases";

export class CuotaController {
  constructor(private readonly cuotaUseCases: CuotaUseCases) {}

  async createCuotas(req: Request, res: Response) {
    const { amount, customerId, months, year, status, facturaId } = req.body;
    const cuota = await this.cuotaUseCases.addCuotasToCustomer({
      amount,
      customerId,
      months,
      year,
      status,
      facturaId,
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

  async updateCuota(req: Request, res: Response) {
    const { status, serie, customerId, monto } = req.body;
    const cuota = await this.cuotaUseCases.updateCuota(req.params.uuid, {
      status,
      serie,
      customerId,
      monto,
    });
    res.status(200).json(cuota);
  }

  async generateAllCuotas(req: Request, res: Response) {
    const result = await this.cuotaUseCases.generateCurrentMonthCuotas();
    res.status(200).json(result);
  }
}
