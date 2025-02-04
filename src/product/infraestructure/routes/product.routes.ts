import { Router } from "express";
import { ProductMongoRepository } from "../repository/mongo.repository";
import { ProductUseCases } from "../../application/product.usecase";
import { ProductController } from "../controller/product.ctrl";
import { zodValidator } from "../../../middlewares/zodValidator";
import {
  CreateProductSchema,
  EditProductSchema,
} from "../../domain/product.validations";
import { asyncHandler } from "../../../middlewares/asyncHandlerMiddleware";

export const router = Router();

const productUseCases = new ProductUseCases(new ProductMongoRepository());
const controllers = new ProductController(productUseCases);

router.post(
  "/",
  zodValidator(CreateProductSchema),
  asyncHandler(controllers.create)
);
router.get("/", asyncHandler(controllers.list));

router.put(
  "/:uuid",
  zodValidator(EditProductSchema),
  asyncHandler(controllers.edit)
);
