import { CustomerController } from "./customer.controller";
import { MongoCustomerRepository } from "./mongo.repository";
import { EditCustomerUseCase } from "../application/edit.usecase";
import { Router } from "express";
import { asyncHandler } from "../../middlewares/asyncHandlerMiddleware";
import { CreateCustomerUseCase } from "../application/create.usecase";
import { ListCustomersUseCase } from "../application/list.usecase";
import { CustomerDetailUseCase } from "../application/detail.usecase";

const customerRepository = new MongoCustomerRepository();

const controller = new CustomerController(
  new CreateCustomerUseCase(customerRepository),
  new EditCustomerUseCase(customerRepository),
  new ListCustomersUseCase(customerRepository),
  new CustomerDetailUseCase(customerRepository),
);

export const routes = Router();

routes.get("/", asyncHandler(controller.list));
routes.get("/:uuid", asyncHandler(controller.findOne));
routes.patch("/:uuid", asyncHandler(controller.edit));
routes.post("/", asyncHandler(controller.create));
