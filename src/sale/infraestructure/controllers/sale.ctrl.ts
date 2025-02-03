import { saleUseCases } from "@/sale/application/saleUseCases";
import { Response, Request } from "express";

export class SaleController {
  constructor(private saleUseCases: saleUseCases) {}

  public create = async (req: Request, res: Response) => {
    const createdSale = await this.saleUseCases.createSale(req.body);

    res.status(201).json(createdSale);
  };

  public addPayment = async (req: Request, res: Response) => {
    const { uuid } = req.params;
    const payment = req.body;

    const updatedSale = await this.saleUseCases.addPayment(uuid, payment);

    res.status(200).json(updatedSale);
  };

  public addPaymeny = async (req: Request, res: Response) => {
    const { uuid } = req.params;
    const newPayment = req.body;

    const updatedSale = await this.saleUseCases.addPayment(uuid, newPayment);

    res.status(200).json(updatedSale);
  };

  public showDetails = async (req: Request, res: Response) => {
    const { uuid } = req.params;
    const sales = await this.saleUseCases.findSale(uuid);

    res.status(200).json(sales);
  };

  public list = async (req: Request, res: Response) => {
    const sales = await this.saleUseCases.listSales();

    res.status(200).json(sales);
  };
}
