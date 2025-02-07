import { SaleUseCases } from "@/sale/application/saleUseCases";
import { Response, Request } from "express";

export class SaleController {
  constructor(private saleUseCases: SaleUseCases) {}

  public create = async (req: Request, res: Response) => {
    const createdSale = await this.saleUseCases.createTransaction(req.body);

    res.status(201).json(createdSale);
  };

  public showDetails = async (req: Request, res: Response) => {
    const { uuid } = req.params;
    const sale = await this.saleUseCases.findSale(uuid);

    res.status(200).json(sale);
  };

  public changeStatus = async (req: Request, res: Response) => {
    const updatedSale = await this.saleUseCases.changeStatus(req.body);
    res.status(200).json(updatedSale);
  };

  public list = async (req: Request, res: Response) => {
    const sales = await this.saleUseCases.listSales();

    res.status(200).json(sales);
  };

  public addPayment = async (req: Request, res: Response) => {
    const { uuid } = req.params;
    const payment = req.body;
    const updatedSale = await this.saleUseCases.addPayment(uuid, payment);

    res.status(200).json(updatedSale);
  };

  public getPayments = async (req: Request, res: Response) => {
    const { uuid } = req.params;
    const payments = await this.saleUseCases.getPayments(uuid);

    res.status(200).json(payments);
  };

  public updatePaymentStatus = async (req: Request, res: Response) => {
    const { saleID, paymentID } = req.params;
    const { status } = req.body;

    console.log(saleID, paymentID, status);

    const payment = await this.saleUseCases.updatePaymentStatus({
      saleID,
      paymentID,
      status,
    });

    res.status(200).json(payment);
  };
}
