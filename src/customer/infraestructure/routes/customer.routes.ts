import {
  BajaCustumerSchema,
  CreateCustomerSchema,
  EditCustumerSchema,
} from "../../adapters/inputDTO";
import { Router } from "express";
import { asyncHandler } from "../../../middlewares/asyncHandlerMiddleware";
import { zodValidator } from "../../../middlewares/zodValidator";
import { CustomerUseCases } from "../../application/custumerUseCases";
import { CustomerController } from "../controllers/customer.ctrl";
import { CustomerMongoRepository } from "../repository/mongo.repository";

export const routes = Router();

const customerRepo = new CustomerMongoRepository();
const customerUseCases = new CustomerUseCases(customerRepo);
const customerController = new CustomerController(customerUseCases);

routes.post(
  "/",
  zodValidator(CreateCustomerSchema),
  asyncHandler(customerController.create),
);

routes.get("/", asyncHandler(customerController.list));

routes.patch(
  "/:uuid",
  zodValidator(EditCustumerSchema),
  asyncHandler(customerController.edit),
);

routes.post(
  "/status",
  zodValidator(BajaCustumerSchema),
  asyncHandler(customerController.updateStatus),
);
