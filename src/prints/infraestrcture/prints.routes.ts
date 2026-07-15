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
import { MongoCustomerRepository } from "../../customerV2/infra/mongo.repository";
import { MongoCuotaRepository } from "../../cuotaV2/infra/cuota.repository";
import { MongoCuotaPaymentRepository } from "../../cuota-payment/infra/cuota-payment.repository";
import { OpenWaService } from "../../shared/infraestructure/OpenWaService";

export const router = Router();

const customersRepo = new MongoCustomerRepository();
const cuotasRepo = new MongoCuotaRepository();
const cuotasPaymentRepo = new MongoCuotaPaymentRepository();

const salesrepo = new SaleMongoRepository();
const budgetsrepo = new BudgetMongoRepository();

const usecases = new PrintBudgetUseCase(budgetsrepo, customersRepo);
const sales = new PrintSaleUseCase(salesrepo, customersRepo);
const reciptuescase = new PrintReciboUseCase(salesrepo, customersRepo);
const openWAService = new OpenWaService();
const monitusecase = new PrintMonitoreoSummaryUseCase(openWAService);
const recibomonitoreo = new PrintReciboMonitoreoUseCase(
  cuotasPaymentRepo,
  cuotasRepo,
  customersRepo,
  openWAService,
);
const printAccountSummaryUseCase = new PrintAccountSummaryUseCase(
  salesrepo,
  customersRepo,
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
  "/monit-recipt/:paymentId",
  asyncHandler(ctrl.printReciboMonitore.bind(ctrl)),
);

// para enviar wpps
router.post(
  "/monit-recipt/:paymentId",
  asyncHandler(ctrl.printReciboMonitore.bind(ctrl)),
);

router.post(
  "/rsmmonit/:uuid",
  asyncHandler(ctrl.printMonitoreoSummary.bind(ctrl)),
);
