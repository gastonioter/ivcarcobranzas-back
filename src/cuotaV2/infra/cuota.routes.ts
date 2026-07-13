import { Router } from "express";
import { PayCuotasUseCase } from "../../cuota-payment/application/pay-cuotas.usecase";
import { MongoCuotaPaymentRepository } from "../../cuota-payment/infra/cuota-payment.repository";
import { asyncHandler } from "../../middlewares/asyncHandlerMiddleware";
import { CuotaGenerationUseCases } from "../application/cuotaGeneration";
import { EditCuotaUseCase } from "../application/edit-cuota.usecase";
import { ListUseCase } from "../application/list.usecase";
import { MarkCuotaAsNoServiceUseCase } from "../application/mark-no-service.usecase";
import { ReactivateCuotaUseCase } from "../application/reactivate-cuota.usecase";
import { CuotaController } from "./cuota.controller";
import { MongoCuotaRepository } from "./cuota.repository";

const cuotaRepository = new MongoCuotaRepository();
const paymentRepository = new MongoCuotaPaymentRepository();

const controller = new CuotaController(
  new ListUseCase(cuotaRepository),
  new CuotaGenerationUseCases(cuotaRepository),
  new EditCuotaUseCase(cuotaRepository),
  new MarkCuotaAsNoServiceUseCase(cuotaRepository),
  new ReactivateCuotaUseCase(cuotaRepository),
  new PayCuotasUseCase(cuotaRepository, paymentRepository),
);

export const cuotaV2Router = Router();

cuotaV2Router.get("/", asyncHandler(controller.list));
cuotaV2Router.post("/", asyncHandler(controller.generate));
cuotaV2Router.patch("/:id", asyncHandler(controller.edit));
cuotaV2Router.post(
  "/:id/mark-no-service",
  asyncHandler(controller.markAsNoService),
);
cuotaV2Router.post("/:id/reactivate", asyncHandler(controller.reactivate));
