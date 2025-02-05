import { Router } from "express";
import { zodValidator } from "../../../middlewares/zodValidator";
import { saleUseCases } from "../../application/saleUseCases";
import {
  createSaleSchema,
  paymentSchema,
  updateSaleStatusSchema,
} from "../../domain/sale.validations";
import { SaleController } from "../controllers/sale.ctrl";
import { SalesMongoRepository } from "../repository/mongo.repository";
import { asyncHandler } from "../../../middlewares/asyncHandlerMiddleware";

export const routes = Router();

const salesRepo = new SalesMongoRepository();
const salesUseCases = new saleUseCases(salesRepo);
const salesController = new SaleController(salesUseCases);

routes.post(
  "/",
  zodValidator(createSaleSchema),
  asyncHandler(salesController.create)
);
routes.get("/", asyncHandler(salesController.list));

routes.post(
  "/status",
  zodValidator(updateSaleStatusSchema),
  asyncHandler(salesController.changeStatus)
);

routes.get("/:uuid", asyncHandler(salesController.showDetails));
routes.patch(
  "/:uuid",
  zodValidator(paymentSchema),
  asyncHandler(salesController.addPayment)
);
