import { zodValidator } from "../../middlewares/zodValidator";
import { Router } from "express";
import { CustomerMongoRepository } from "../../customer/infraestructure/repository/mongo.repository";
import { asyncHandler } from "../../middlewares/asyncHandlerMiddleware";
import {
  BulkCreateCuotaSchema,
  updateCuotaSchema,
  UpdateCuotasSchema,
} from "../adapters/inputCuotaDTO";
import { CuotaUseCases } from "../application/cuotaUseCases";
import { CuotaController } from "./ctrl";
import { CuotaMongoRepository } from "./cuota.mongo";

export const router = Router();

const customersRepo = new CustomerMongoRepository();
const cuotaRepo = new CuotaMongoRepository();

const cuotaUseCases = new CuotaUseCases(cuotaRepo, customersRepo);
const ctrl = new CuotaController(cuotaUseCases);

router.get("/:customerId", asyncHandler(ctrl.getCuotas.bind(ctrl)));

router.post(
  "/",
  zodValidator(BulkCreateCuotaSchema),
  asyncHandler(ctrl.createCuotas.bind(ctrl)),
);

router.patch(
  "/",
  zodValidator(UpdateCuotasSchema),
  asyncHandler(ctrl.updateCuotasStatus.bind(ctrl)),
);
router.patch(
  "/:uuid",
  zodValidator(updateCuotaSchema),
  asyncHandler(ctrl.updateCuota.bind(ctrl)),
);

router.post("/generateAll", asyncHandler(ctrl.generateAllCuotas.bind(ctrl)));
