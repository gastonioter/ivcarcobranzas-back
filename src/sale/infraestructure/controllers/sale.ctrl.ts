import { saleUseCases } from "@/sale/application/saleUseCases";
import { Response, Request } from "express";

export class SaleController {
  constructor(private saleUseCases: saleUseCases) {}

  public create = async (req: Request, res: Response) => {
    const createdSale = await this.saleUseCases.createSale(req.body);

    res.status(201).json(createdSale);
  };

  async showDetails(req: Request, res: Response) {
    const { uuid } = req.params;
    const sales = await this.saleUseCases.findSale(uuid);

    res.status(200).json(sales);
  }

  public list = async (req: Request, res: Response) => {
    const sales = await this.saleUseCases.listSales();

    res.status(200).json(sales);
  };
}
