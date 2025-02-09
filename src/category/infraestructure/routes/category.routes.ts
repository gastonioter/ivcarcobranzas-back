import { Router } from "express";
import { CategoryController } from "../controllers/category.ctrl";
import { CategoryMongoRepository } from "../repository/mongo.repository";
import { CategoryUseCases } from "../../application/categoryUseCases";
import { zodValidator } from "../../../middlewares/zodValidator";
import { CreateCategorySchema } from "../dto/CategoryValidations";
import { asyncHandler } from "../../../middlewares/asyncHandlerMiddleware";

export const router = Router();

const categoryMongoRepository = new CategoryMongoRepository();
const categoryUseCases = new CategoryUseCases(categoryMongoRepository);
const categoryController = new CategoryController(categoryUseCases);

router.post("/", asyncHandler(categoryController.createCategory));
router.get("/", asyncHandler(categoryController.findAllCategories));
