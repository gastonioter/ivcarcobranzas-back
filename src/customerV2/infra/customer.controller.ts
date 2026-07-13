import { Request, Response } from "express";
import { CreateCustomerUseCase } from "../application/create.usecase";
import { EditCustomerUseCase } from "../application/edit.usecase";
import { ListCustomersUseCase } from "../application/list.usecase";

export class CustomerController {
  constructor(
    private readonly createUseCase: CreateCustomerUseCase,
    private readonly editUseCase: EditCustomerUseCase,
    private readonly listUseCase: ListCustomersUseCase,
  ) {}

  create = async (req: Request, res: Response) => {
    const customer = await this.createUseCase.execute(req.body);
    res.status(201).json(customer);
  };

  edit = async (req: Request, res: Response) => {
    const { uuid } = req.params;
    const customer = await this.editUseCase.execute(uuid, req.body);
    res.status(200).json(customer);
  };

  list = async (req: Request, res: Response) => {
    const query = req.query;
    const customers = await this.listUseCase.execute(query);
    res.status(200).json(customers);
  };
}
