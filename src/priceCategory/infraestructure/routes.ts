import { Router } from "express";
import { MongoPriceCategoryRepository } from "./db.mongo";
import { PriceCategoryController } from "./ctrl";
import { priceCategoryUseCases } from "../application/priceCategoryuseCases";

export const router = Router();

const repo = new MongoPriceCategoryRepository();
const usecases = new priceCategoryUseCases(repo);
const ctrl = new PriceCategoryController(usecases);

router.post("/", ctrl.create.bind(ctrl));

router.get("/", ctrl.list.bind(ctrl));
