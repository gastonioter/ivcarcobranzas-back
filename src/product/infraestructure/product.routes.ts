import { Router } from "express";
import { asyncHandler } from "../../middlewares/asyncHandlerMiddleware";
import { CreateProductUseCase } from "../application/create.usecase";
import { EditProductUseCase } from "../application/edit.usecase";
import { ListProductsUseCase } from "../application/list.usecase";
import { ProductMongoRepository } from "./mongo.repository";
import { ProductController } from "./product.ctrl";

const repository = new ProductMongoRepository();
const controller = new ProductController(
  new ListProductsUseCase(repository),
  new CreateProductUseCase(repository),
  new EditProductUseCase(repository),
);

export const router = Router();

router.get("/", asyncHandler(controller.list));
router.post("/", asyncHandler(controller.create));
router.patch("/:uuid", asyncHandler(controller.edit));
