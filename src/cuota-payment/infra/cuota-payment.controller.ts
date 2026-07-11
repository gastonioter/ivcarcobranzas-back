import { ListPaymentsUseCase } from "../application/list.usecase";
import { PayCuotasUseCase } from "../application/pay-cuotas.usecase";
import { Request, Response } from "express";

export class CuotaPaymentController {
  constructor(
    private readonly payCuotaUseCase: PayCuotasUseCase,
    private readonly listPaymentsUseCase: ListPaymentsUseCase,
  ) {}

  payCuotas = async (req: Request, res: Response): Promise<void> => {
    const { cuotaIds, customerId } = req.body;
    const result = await this.payCuotaUseCase.execute({ cuotaIds, customerId });
    res.status(200).json(result);
  };

  listPayments = async (req: Request, res: Response): Promise<void> => {
    const { customerId } = req.query;
    const payments = await this.listPaymentsUseCase.execute({
      customerId: customerId as string,
    });
    res.status(200).json(payments);
  };
}
