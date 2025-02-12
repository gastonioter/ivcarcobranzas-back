import { Router } from "express";
import { MongoPriceCategoryRepository } from "./db.mongo";
import { PriceCategoryController } from "./ctrl";
import { CloudCategoryUseCases } from "../application/cloudCategoryuseCases";

export const router = Router();

const repo = new MongoPriceCategoryRepository();
const usecases = new CloudCategoryUseCases(repo);
const ctrl = new PriceCategoryController(usecases);

router.post("/", ctrl.create.bind(ctrl));

router.get("/", ctrl.list.bind(ctrl));
