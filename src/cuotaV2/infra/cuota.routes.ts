import { Router } from "express";
import { asyncHandler } from "../../middlewares/asyncHandlerMiddleware";
import { MongoCuotaRepository } from "./cuota.repository";
import { MongoCustomerRepository } from "../../customerV2/infra/mongo.repository";
import { MongoCuotaPaymentRepository } from "../../cuota-payment/infra/cuota-payment.repository";
import { CuotaGenerationUseCases } from "../application/cuotaGeneration";
import { EditCuotaUseCase } from "../application/edit-cuota.usecase";
import { ListUseCase } from "../application/list.usecase";
import { MarkCuotaAsNoServiceUseCase } from "../application/mark-no-service.usecase";
import { ReactivateCuotaUseCase } from "../application/reactivate-cuota.usecase";
import { PayCuotasUseCase } from "../../cuota-payment/application/pay-cuotas.usecase";
import { CuotaController } from "./cuota.controller";

const cuotaRepository      = new MongoCuotaRepository();
const customerRepository   = new MongoCustomerRepository();
const paymentRepository    = new MongoCuotaPaymentRepository();

const controller = new CuotaController(
  new ListUseCase(cuotaRepository, customerRepository),
  new CuotaGenerationUseCases(cuotaRepository),
  new EditCuotaUseCase(cuotaRepository),
  new MarkCuotaAsNoServiceUseCase(cuotaRepository),
  new ReactivateCuotaUseCase(cuotaRepository),
  new PayCuotasUseCase(cuotaRepository, paymentRepository),
);

export const cuotaV2Router = Router();

cuotaV2Router.get("/:customerId",              asyncHandler(controller.list));
cuotaV2Router.post("/generate",                asyncHandler(controller.generate));
cuotaV2Router.patch("/:id/amount",             asyncHandler(controller.edit));
cuotaV2Router.post("/:id/mark-no-service",     asyncHandler(controller.markAsNoService));
cuotaV2Router.post("/:id/reactivate",          asyncHandler(controller.reactivate));
cuotaV2Router.post("/pay",                     asyncHandler(controller.pay));