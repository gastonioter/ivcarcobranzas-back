import { Request, Response } from "express";
import { SaleUseCases } from "../application/saleUseCases";
import { SaleStatus } from "../domain/sale.entity";

export class SaleController {
  constructor(private readonly saleUseCases: SaleUseCases) {}

  async createSale(req: Request, res: Response) {
    const sale = await this.saleUseCases.createSale(req.body);
    res.status(201).send(sale);
  }
  async getDetails(req: Request, res: Response) {
    const { uuid } = req.params;
    const sale = await this.saleUseCases.getDetails(uuid);
    res.status(200).send(sale);
  }

  async listSales(req: Request, res: Response) {
    const sales = await this.saleUseCases.listSales();
    res.status(200).send(sales);
  }

  async update(req: Request, res: Response) {
    const { uuid } = req.params;
    const sale = await this.saleUseCases.update(uuid, req.body);
    res.status(200).send(sale);
  }

  async updatePaymentStatus(req: Request, res: Response) {
    const { saleID, paymentID } = req.params;
    const { status } = req.body;
    const payment = this.saleUseCases.updatePaymentStatus({
      saleID,
      paymentID,
      status,
    });
    res.status(200).send(payment);
  }
}
