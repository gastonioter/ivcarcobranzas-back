import { Request, Response } from "express";
import { CuotaGenerationUseCases } from "../application/cuotaGeneration";
import { EditCuotaUseCase } from "../application/edit-cuota.usecase";
import { ListUseCase } from "../application/list.usecase";
import { MarkCuotaAsNoServiceUseCase } from "../application/mark-no-service.usecase";
import { ReactivateCuotaUseCase } from "../application/reactivate-cuota.usecase";
import { PayCuotasUseCase } from "../../cuota-payment/application/pay-cuotas.usecase";

export class CuotaController {
  constructor(
    private readonly listUseCase: ListUseCase,
    private readonly generateUseCase: CuotaGenerationUseCases,
    private readonly editUseCase: EditCuotaUseCase,
    private readonly markNoServiceUseCase: MarkCuotaAsNoServiceUseCase,
    private readonly reactivateUseCase: ReactivateCuotaUseCase,
    private readonly payUseCase: PayCuotasUseCase,
  ) {}

  list = async (req: Request, res: Response) => {
    // TODO: implement pagination and filtering
    const { customerId } = req.query;

    const cuotas = await this.listUseCase.listAll({
      customerId: customerId as string,
    });
    res.status(200).json(cuotas);
  };

  generate = async (req: Request, res: Response) => {
    const cuotas = await this.generateUseCase.generateCuotasForCustomer(
      req.body,
    );
    res.status(201).json(cuotas);
  };

  edit = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { amount } = req.body;
    const cuota = await this.editUseCase.execute(id, amount);
    res.status(200).json(cuota);
  };

  markAsNoService = async (req: Request, res: Response) => {
    const { id } = req.params;
    const cuota = await this.markNoServiceUseCase.execute(id);
    res.status(200).json(cuota);
  };

  reactivate = async (req: Request, res: Response) => {
    const { id } = req.params;
    const cuota = await this.reactivateUseCase.execute(id);
    res.status(200).json(cuota);
  };

  pay = async (req: Request, res: Response) => {
    const payment = await this.payUseCase.execute(req.body);
    res.status(201).json(payment);
  };
}
