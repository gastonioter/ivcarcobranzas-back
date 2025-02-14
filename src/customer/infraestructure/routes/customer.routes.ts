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
import { SaleMongoRepository } from "../../../transaction/sale/infraestructure/sale.mongo";

export const routes = Router();

const customerUseCases = new CustomerUseCases(
  new CustomerMongoRepository(),
  new MongoPriceCategoryRepository(),
  new SaleMongoRepository(),
);
const customerController = new CustomerController(customerUseCases);

routes.post(
  "/",
  zodValidator(createCustomerSchema),
  asyncHandler(customerController.create),
);

routes.get("/", asyncHandler(customerController.list));

routes.post(
  "/accountsummary/:uuid",
  asyncHandler(customerController.accountSummary),
);
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
