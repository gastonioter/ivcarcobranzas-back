import { Router } from "express";
import { asyncHandler } from "../../../middlewares/asyncHandlerMiddleware";
import { zodValidator } from "../../../middlewares/zodValidator";
import { SaleUseCases } from "../../application/saleUseCases";
import {
  addPaymentRequestSchema,
  createTransactionRequestSchema,
  updateSalePaymentStatusRequestSchema,
  updateSaleStatusRequestSchema,
} from "../../domain/sale.validations";
import { SaleController } from "../controllers/sale.ctrl";
import { SalesMongoRepository } from "../repository/mongo.repository";

export const routes = Router();

const salesRepo = new SalesMongoRepository();
const salesUseCases = new SaleUseCases(salesRepo);
const salesController = new SaleController(salesUseCases);

/* CREATE SALE */
routes.post(
  "/",
  zodValidator(createTransactionRequestSchema),
  asyncHandler(salesController.create)
);

/* FIND ALL SALES */

routes.get("/", asyncHandler(salesController.list));

/* TOGGLE SALE STATUS */

routes.post(
  "/status",
  zodValidator(updateSaleStatusRequestSchema),
  asyncHandler(salesController.changeStatus)
);

/* SALE DETAILS */

routes.get("/:uuid", asyncHandler(salesController.showDetails));

/* GET PAYMENTS */
routes.get("/:uuid/payments", asyncHandler(salesController.getPayments));

/* ADD PAYMENT */
routes.post(
  "/:uuid/payments",
  zodValidator(addPaymentRequestSchema),
  asyncHandler(salesController.addPayment)
);

/*  TOGGLE PAYMENT STATUS */

routes.patch(
  "/:saleID/payments/:paymentID",
  zodValidator(updateSalePaymentStatusRequestSchema),
  asyncHandler(salesController.updatePaymentStatus)
);
