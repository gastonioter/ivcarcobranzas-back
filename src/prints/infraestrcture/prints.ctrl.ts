import { Request, Response } from "express";
import { PrintBudgetUseCase } from "../application/print-budget-use-case";
import { PrintSaleUseCase } from "../application/print-sale-use-case";
import { PrintReciboUseCase } from "../application/print-recibo-use-case";
import { PrintAccountSummaryUseCase } from "../application/print-accountsummary-use-case";

export class PrintsController {
  constructor(
    private readonly printBudgetUseCase: PrintBudgetUseCase,
    private readonly printSaleUseCase: PrintSaleUseCase,
    private readonly printReciboUseCase: PrintReciboUseCase,
    private readonly printAccountSummaryUseCase: PrintAccountSummaryUseCase,
  ) {}

  async printBudget(req: Request, res: Response) {
    const { uuid } = req.params;

    const { pdfStream, filename } =
      await this.printBudgetUseCase.printBudget(uuid);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${filename}.pdf`,
    );
    pdfStream.pipe(res);
    pdfStream.on("end", () => res.end());
    pdfStream.on("error", (error: any) => {
      console.error(error);
      res.status(500).end();
    });
  }

  async printSale(req: Request, res: Response) {
    const { uuid } = req.params;

    const { pdfStream, filename } = await this.printSaleUseCase.printSale(uuid);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${filename}.pdf`,
    );
    pdfStream.pipe(res);
    pdfStream.on("end", () => res.end());
    pdfStream.on("error", (error: any) => {
      console.error(error);
      res.status(500).end();
    });
  }

  async printRecibo(req: Request, res: Response) {
    const { saleId, paymentId } = req.params;

    const { pdfStream, filename } = await this.printReciboUseCase.print(
      saleId,
      paymentId,
    );

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${filename}.pdf`,
    );
    pdfStream.pipe(res);
    pdfStream.on("end", () => res.end());
    pdfStream.on("error", (error: any) => {
      console.error(error);
      res.status(500).end();
    });
  }

  async printAccountSummary(req: Request, res: Response) {
    const { uuid } = req.params;
    const { pdfStream, filename } =
      await this.printAccountSummaryUseCase.print(uuid);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${filename}.pdf`,
    );
    pdfStream.pipe(res);
    pdfStream.on("end", () => res.end());
    pdfStream.on("error", (error: any) => {
      console.error(error);
      res.status(500).end();
    });
  }
}
