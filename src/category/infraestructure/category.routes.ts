import { Router } from "express";
import { asyncHandler } from "../../middlewares/asyncHandlerMiddleware";
import { CreateUseCase } from "../application/create.usecase";
import { ListUseCase } from "../application/list.usecase";
import { CategoryController } from "./category.ctrl";
import { CategoryMongoRepository } from "./mongo.repository";

const repository = new CategoryMongoRepository();
const categoryController = new CategoryController(
  new ListUseCase(repository),
  new CreateUseCase(repository),
);

export const router = Router();

router.post("/", asyncHandler(categoryController.createCategory));
router.get("/", asyncHandler(categoryController.findAllCategories));
