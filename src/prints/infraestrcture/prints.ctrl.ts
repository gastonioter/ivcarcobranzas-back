import { Request, Response } from "express";
import { PrintBudgetUseCase } from "../application/print-budget-use-case";

export class PrintsController {
  constructor(private readonly printBudgetUseCase: PrintBudgetUseCase) {}

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
}
