import { CustomerUseCases } from "@/customer/application/custumerUseCases";
import { Request, Response } from "express";

export class CustomerController {
  constructor(private customerUseCases: CustomerUseCases) {}

  public create = async (req: Request, res: Response) => {
    const customer = await this.customerUseCases.createCustomer(req.body);
    res.status(201).json(customer);
  };

  public edit = async (req: Request, res: Response) => {};

  public list = async (req: Request, res: Response) => {
    const customers = await this.customerUseCases.getCustomers();
    res.status(200).json(customers);
  };

  public get = async (req: Request, res: Response) => {
    const customer = await this.customerUseCases.getCustomer(req.params.uuid);
    res.status(200).json(customer);
  };

  public delete = async (req: Request, res: Response) => {
    const customer = await this.customerUseCases.deleteCustomer(
      req.params.uuid
    );
    res.status(200).json(customer);
  };
}
