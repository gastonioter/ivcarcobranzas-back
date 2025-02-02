import { saleUseCases } from "@/sale/application/saleUseCases";
import { Request, Response } from "express";

export class SaleController {
  constructor(private saleUseCases: saleUseCases) {}

  async create(req: Request, res: Response) {
    const createdSale = await this.saleUseCases.createSale(req.body);

    return res.status(201).json(createdSale);
  }

  async showDetails(req: Request, res: Response) {
    const { uuid } = req.params;
    const sales = await this.saleUseCases.findSale(uuid);

    return res.status(200).json(sales);
  }

  async list(req: Request, res: Response) {
    const sales = await this.saleUseCases.listSales();

    return res.status(200).json(sales);
  }
}
