import { Router } from "express";
import { MongoPriceCategoryRepository } from "./db.mongo";
import { PriceCategoryController } from "./ctrl";
import { CloudCategoryUseCases } from "../application/cloudCategoryuseCases";
import { asyncHandler } from "../../middlewares/asyncHandlerMiddleware";

export const router = Router();

const repo = new MongoPriceCategoryRepository();
const usecases = new CloudCategoryUseCases(repo);
const ctrl = new PriceCategoryController(usecases);

router.post("/", asyncHandler(ctrl.create.bind(ctrl)));

router.get("/", asyncHandler(ctrl.list.bind(ctrl)));
