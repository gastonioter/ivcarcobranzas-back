import { Router } from "express";
import { asyncHandler } from "../../../middlewares/asyncHandlerMiddleware";
import { zodValidator } from "../../../middlewares/zodValidator";
import { ProductUseCases } from "../../application/product.usecase";
import { CreateEditProductSchema } from "../../domain/product.validations";
import { ProductController } from "../controller/product.ctrl";
import { ProductMongoRepository } from "../repository/mongo.repository";
import { CategoryMongoRepository } from "../../../category/infraestructure/repository/mongo.repository";

export const router = Router();

const productUseCases = new ProductUseCases(
  new ProductMongoRepository(),
  new CategoryMongoRepository(),
);
const controllers = new ProductController(productUseCases);

router.post(
  "/",
  //zodValidator(CreateEditProductSchema),
  asyncHandler(controllers.create),
);

router.get("/", asyncHandler(controllers.list));

router.patch(
  "/:uuid",
  zodValidator(CreateEditProductSchema),
  asyncHandler(controllers.edit),
);
