import { Router } from "express";
import { ProductMongoRepository } from "../repository/mongo.repository";
import { ProductUseCases } from "../../application/product.usecase";
import { ProductController } from "../controller/product.ctrl";
import { zodValidator } from "../../../middlewares/zodValidator";
import {
  CreateProductSchema,
  EditProductSchema,
} from "../../domain/product.validations";

export const router = Router();

const productUseCases = new ProductUseCases(new ProductMongoRepository());
const controllers = new ProductController(productUseCases);

router.post("/", zodValidator(CreateProductSchema), controllers.create);
router.get("/", controllers.list);
router.put("/:uuid", zodValidator(EditProductSchema), controllers.edit);
