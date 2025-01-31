import { Router } from "express";
import { ProductMongoRepository } from "../repository/mongo.repository";
import { ProductUseCases } from "../../application/product.usecase";
import { ProductController } from "../controller/product.ctrl";

export const router = Router();

const productUseCases = new ProductUseCases(new ProductMongoRepository());
const controllers = new ProductController(productUseCases);

router.post("/", controllers.create);
router.get("/", controllers.list);
router.put("/:uuid", controllers.edit);
