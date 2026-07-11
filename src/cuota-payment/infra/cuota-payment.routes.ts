import { Router } from "express";
import { MongoCuotaPaymentRepository } from "./cuota-payment.repository";
import { PayCuotasUseCase } from "../application/pay-cuotas.usecase";
import { CuotaPaymentController } from "./cuota-payment.controller";
import { MongoCuotaRepository } from "../../cuotaV2/infra/cuota.repository";
import { ListPaymentsUseCase } from "../application/list.usecase";
import { asyncHandler } from "../../middlewares/asyncHandlerMiddleware";

const cuotaRepository = new MongoCuotaRepository();
const paymentRepository = new MongoCuotaPaymentRepository();

const controller = new CuotaPaymentController(
  new PayCuotasUseCase(cuotaRepository, paymentRepository),
  new ListPaymentsUseCase(paymentRepository),
);

export const router = Router();

router.post("/", asyncHandler(controller.payCuotas));
router.get("/", asyncHandler(controller.listPayments));
