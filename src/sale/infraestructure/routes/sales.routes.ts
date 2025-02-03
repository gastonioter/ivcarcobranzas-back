import { Router } from "express";
import { zodValidator } from "../../../middlewares/zodValidator";
import { saleUseCases } from "../../application/saleUseCases";
import { createSaleSchema, paymentSchema } from "../../domain/sale.validations";
import { SaleController } from "../controllers/sale.ctrl";
import { SalesMongoRepository } from "../repository/mongo.repository";

export const routes = Router();

const salesRepo = new SalesMongoRepository();
const salesUseCases = new saleUseCases(salesRepo);
const salesController = new SaleController(salesUseCases);

routes.post("/", zodValidator(createSaleSchema), salesController.create);
routes.get("/", salesController.list);
routes.get("/:uuid", salesController.showDetails);
routes.patch("/:uuid", zodValidator(paymentSchema), salesController.addPayment);
