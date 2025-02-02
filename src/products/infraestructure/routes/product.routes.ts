import { Router } from "express";

import { zodValidator } from "@/middlewares/zodValidator";
import {
  CreateProductSchema,
  EditProductSchema,
} from "@/product/domain/product.validations";
import { ProductUseCases } from "@/product/application/product.usecase";
import { ProductMongoRepository } from "@/product/infraestructure/repository/mongo.repository";
import { ProductController } from "@/product/infraestructure/controller/product.ctrl";

export const router = Router();

const productUseCases = new ProductUseCases(new ProductMongoRepository());
const controllers = new ProductController(productUseCases);

router.post("/", zodValidator(CreateProductSchema), controllers.create);
router.get("/", controllers.list);
router.put("/:uuid", zodValidator(EditProductSchema), controllers.edit);
