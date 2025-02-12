import { MongoPriceCategoryRepository } from "../../../cloudCategory/infraestructure/db.mongo";
import { Router } from "express";
import { asyncHandler } from "../../../middlewares/asyncHandlerMiddleware";
import { zodValidator } from "../../../middlewares/zodValidator";
import {
  BajaCustumerSchema,
  createCustomerSchema,
} from "../../adapters/CreateCustomerDTO";
import { CustomerUseCases } from "../../application/custumerUseCases";
import { CustomerController } from "../controllers/customer.ctrl";
import { CustomerMongoRepository } from "../repository/mongo.repository";

export const routes = Router();

const customerRepo = new CustomerMongoRepository();
const customerUseCases = new CustomerUseCases(
  customerRepo,
  new MongoPriceCategoryRepository(),
);
const customerController = new CustomerController(customerUseCases);

routes.post(
  "/",
  zodValidator(createCustomerSchema),
  asyncHandler(customerController.create),
);

routes.get("/", asyncHandler(customerController.list));

routes.patch(
  "/:uuid",
  zodValidator(createCustomerSchema),
  asyncHandler(customerController.edit),
);

routes.post(
  "/status",
  zodValidator(BajaCustumerSchema),
  asyncHandler(customerController.updateStatus),
);
