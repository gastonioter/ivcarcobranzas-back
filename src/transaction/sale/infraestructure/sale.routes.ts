import { Router } from "express";
import { CustomerMongoRepository } from "../../../customer/infraestructure/repository/mongo.repository";
import { asyncHandler } from "../../../middlewares/asyncHandlerMiddleware";
import { zodValidator } from "../../../middlewares/zodValidator";
import { CreateSaleSchema, EditSaleSchema } from "../adapets/inputSaleDTOs";
import { SaleUseCases } from "../application/saleUseCases";
import { SaleController } from "./sale.ctrl";
import { SaleMongoRepository } from "./sale.mongo";
import { SalePaymentMongoRepository } from "../../../transaction/salePayment/infraestructure/salePayment.mongo";
import { MongoRepository } from "../../../user/infraestructure/repository/mongo.repository";

export const router = Router();

const salesrepo = new SaleMongoRepository();
const customersrepo = new CustomerMongoRepository();
const salePaymentRepo = new SalePaymentMongoRepository();
const usersrepo = new MongoRepository();
const usecases = new SaleUseCases(
  salesrepo,
  customersrepo,
  salePaymentRepo,
  usersrepo,
);

const ctrl = new SaleController(usecases);

router.get("/", asyncHandler(ctrl.listSales.bind(ctrl)));

router.get("/:uuid", asyncHandler(ctrl.getDetails.bind(ctrl)));

router.get("/:uuid/payments", asyncHandler(ctrl.getPayments.bind(ctrl)));

router.post(
  "/",
  zodValidator(CreateSaleSchema),
  asyncHandler(ctrl.createSale.bind(ctrl)),
);

router.patch(
  "/:uuid",
  zodValidator(EditSaleSchema),
  asyncHandler(ctrl.update.bind(ctrl)),
);
