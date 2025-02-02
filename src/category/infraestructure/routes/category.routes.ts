import { Router } from "express";
import { CategoryController } from "../controllers/category.ctrl";
import { CategoryMongoRepository } from "../repository/mongo.repository";
import { CategoryUseCases } from "../../application/categoryUseCases";
import { zodValidator } from "../../../middlewares/zodValidator";
import { CreateCategorySchema } from "../../domain/categories.validations";

export const router = Router();

const categoryMongoRepository = new CategoryMongoRepository();
const categoryUseCases = new CategoryUseCases(categoryMongoRepository);
const categoryController = new CategoryController(categoryUseCases);

router.post(
  "/",
  zodValidator(CreateCategorySchema),
  categoryController.createCategory
);
router.get("/", categoryController.findAllCategories);
