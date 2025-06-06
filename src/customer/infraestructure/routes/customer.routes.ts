import { Router } from "express";
import { MongoPriceCategoryRepository } from "../../../cloudCategory/infraestructure/db.mongo";
import { asyncHandler } from "../../../middlewares/asyncHandlerMiddleware";
import { zodValidator } from "../../../middlewares/zodValidator";
import { SaleMongoRepository } from "../../../transaction/sale/infraestructure/sale.mongo";
import {
  createCustomerSchema,
  editCustomerSchema,
  updateCustomerStatusSchema,
} from "../../adapters/CreateCustomerDTO";
import { CustomerUseCases } from "../../application/custumerUseCases";
import { CustomerController } from "../controllers/customer.ctrl";
import { CustomerMongoRepository } from "../repository/mongo.repository";

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
routes.get("/recibos/:uuid", asyncHandler(customerController.getRecibosCustomer)); 
routes.get("/:uuid", asyncHandler(customerController.get));

routes.post(
  "/accountsummary/:uuid",
  asyncHandler(customerController.accountSummary),
);
routes.patch(
  "/:uuid",
  zodValidator(editCustomerSchema),
  asyncHandler(customerController.edit),
);

routes.post(
  "/status",
  zodValidator(updateCustomerStatusSchema),
  asyncHandler(customerController.updateStatus),
);

routes.delete("/:uuid", asyncHandler(customerController.delete));
