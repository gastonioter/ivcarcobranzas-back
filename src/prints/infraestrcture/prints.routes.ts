import { CustomerMongoRepository } from "../../customer/infraestructure/repository/mongo.repository";
import { SaleMongoRepository } from "../../transaction/sale/infraestructure/sale.mongo";
import { Router } from "express";
import { PrintBudgetUseCase } from "../application/print-budget-use-case";
import { BudgetMongoRepository } from "../../transaction/budget/infraestructure/budget.mongo";
import { PrintsController } from "./prints.ctrl";
import { asyncHandler } from "../../middlewares/asyncHandlerMiddleware";
import { PrintSaleUseCase } from "../application/print-sale-use-case";
import { PrintReciboUseCase } from "../application/print-recibo-use-case";
import { PrintAccountSummaryUseCase } from "../application/print-accountsummary-use-case";
import { PrintMonitoreoSummaryUseCase } from "../application/print-monitoreosummary-usecase";
import { PrintReciboMonitoreoUseCase } from "../application/print-recibopago-use-case";

export const router = Router();

const customersrepo = new CustomerMongoRepository();
const salesrepo = new SaleMongoRepository();
const budgetsrepo = new BudgetMongoRepository();

const usecases = new PrintBudgetUseCase(budgetsrepo, customersrepo);
const sales = new PrintSaleUseCase(salesrepo, customersrepo);
const reciptuescase = new PrintReciboUseCase(salesrepo, customersrepo);
const monitusecase = new PrintMonitoreoSummaryUseCase(customersrepo);
const recibomonitoreo = new PrintReciboMonitoreoUseCase(customersrepo);
const printAccountSummaryUseCase = new PrintAccountSummaryUseCase(
  salesrepo,
  customersrepo,
);
const ctrl = new PrintsController(
  usecases,
  sales,
  reciptuescase,
  printAccountSummaryUseCase,
  monitusecase,
  recibomonitoreo,
);

router.get("/budget/:uuid", asyncHandler(ctrl.printBudget.bind(ctrl)));
router.get("/sale/:uuid", asyncHandler(ctrl.printSale.bind(ctrl)));
router.get(
  "/recipt/:saleId/:paymentId",
  asyncHandler(ctrl.printRecibo.bind(ctrl)),
);
router.get("/rsmcta/:uuid", asyncHandler(ctrl.printAccountSummary.bind(ctrl)));
router.get(
  "/rsmmonit/:uuid",
  asyncHandler(ctrl.printMonitoreoSummary.bind(ctrl)),
);

router.get(
  "/monit-recipt/:customerId/:paymentId",
  asyncHandler(ctrl.printReciboMonitore.bind(ctrl)),
);
