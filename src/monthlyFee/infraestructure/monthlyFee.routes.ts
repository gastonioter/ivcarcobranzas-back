import { Router } from "express";
import { MonthlyFeeUseCases } from "../application/monthlyFeeUseCases";
import { MonthlyFeeMongoRepository } from "./mongo.repository";
import { MonthlyFeeController } from "./monthlyFee.ctrl";

export const router = Router();

const monthlyFeeUseCases = new MonthlyFeeUseCases(
  new MonthlyFeeMongoRepository()
);
const controller = new MonthlyFeeController(monthlyFeeUseCases);

router.post("/", controller.createMonthlyFee);
router.get("/", controller.findAllMonthlyFees);
