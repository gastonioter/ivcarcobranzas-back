import { Router } from "express";
import { CustomerMongoRepository } from "../repository/mongo.repository";
import { CustomerUseCases } from "../../application/custumerUseCases";
import { CustomerController } from "../controllers/customer.ctrl";
import { zodValidator } from "../../../middlewares/zodValidator";
import { CreateCustomerSchema } from "../../domain/customer.validations";
import { asyncHandler } from "../../../middlewares/asyncHandlerMiddleware";

export const routes = Router();

const customerRepo = new CustomerMongoRepository();
const customerUseCases = new CustomerUseCases(customerRepo);
const customerController = new CustomerController(customerUseCases);

routes.post(
  "/",
  zodValidator(CreateCustomerSchema),
  asyncHandler(customerController.create)
);
routes.get("/", asyncHandler(customerController.list));
