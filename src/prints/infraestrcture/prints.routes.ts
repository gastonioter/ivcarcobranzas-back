import { CustomerMongoRepository } from "../../customer/infraestructure/repository/mongo.repository";
import { SaleMongoRepository } from "../../transaction/sale/infraestructure/sale.mongo";
import { Router } from "express";
import { PrintBudgetUseCase } from "../application/print-budget-use-case";
import { BudgetMongoRepository } from "../../transaction/budget/infraestructure/budget.mongo";
import { PrintsController } from "./prints.ctrl";
import { asyncHandler } from "../../middlewares/asyncHandlerMiddleware";

export const router = Router();

const customersrepo = new CustomerMongoRepository();
const salesrepo = new SaleMongoRepository();
const budgetsrepo = new BudgetMongoRepository();

const usecases = new PrintBudgetUseCase(budgetsrepo, customersrepo);

const ctrl = new PrintsController(usecases);

router.get("/budget/:uuid", asyncHandler(ctrl.printBudget.bind(ctrl)));
