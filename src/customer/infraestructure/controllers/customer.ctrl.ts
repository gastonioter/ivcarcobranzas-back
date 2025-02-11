import { CustomerUseCases } from "@/customer/application/custumerUseCases";
import { Request, Response } from "express";

export class CustomerController {
  constructor(private customerUseCases: CustomerUseCases) {}

  public create = async (req: Request, res: Response) => {
    const customer = await this.customerUseCases.createCustomer(req.body);
    res.status(201).json(customer);
  };

  public edit = async (req: Request, res: Response) => {
    const { uuid } = req.params;
    const newData = req.body;

    const customer = await this.customerUseCases.editCustomer(uuid, newData);

    res.status(200).json(customer);
  };

  public updateStatus = async (req: Request, res: Response) => {
    const { uuid, status } = req.body;
    const customer = await this.customerUseCases.updateStatus(uuid, status);
    res.status(200).json(customer);
  };

  public list = async (req: Request, res: Response) => {
    const customers = await this.customerUseCases.getCustomers();
    res.status(200).json(customers);
  };

  public get = async (req: Request, res: Response) => {
    const customer = await this.customerUseCases.getCustomer(req.params.uuid);
    res.status(200).json(customer);
  };
}
