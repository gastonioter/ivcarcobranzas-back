import { Router } from "express";
import { CuotaMongoRepository } from "./cuota.mongo";
import { CustomerMongoRepository } from "../../customer/infraestructure/repository/mongo.repository";
import { CuotaUseCases } from "../application/cuotaUseCases";
import { CuotaController } from "./ctrl";
import { asyncHandler } from "../../middlewares/asyncHandlerMiddleware";

export const router = Router();

const customersRepo = new CustomerMongoRepository();
const cuotaRepo = new CuotaMongoRepository();

const cuotaUseCases = new CuotaUseCases(cuotaRepo, customersRepo);
const ctrl = new CuotaController(cuotaUseCases);
router.get("/:customerId", asyncHandler(ctrl.getCuotas.bind(ctrl)));

router.post("/", asyncHandler(ctrl.createCuota.bind(ctrl)));
