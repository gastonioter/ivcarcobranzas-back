import { SalesMongoRepository } from "../repository/mongo.repository";
import { saleUseCases } from "../../application/saleUseCases";
import { SaleController } from "../controllers/sale.ctrl";
import { Router } from "express";

export const routes = Router();

const salesRepo = new SalesMongoRepository();
const salesUseCases = new saleUseCases(salesRepo);
const salesController = new SaleController(salesUseCases);

routes.post("/", salesController.create);
routes.get("/", salesController.list);
