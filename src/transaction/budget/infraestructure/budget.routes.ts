import { Router } from "express";
import { BudgetMongoRepository } from "./budget.mongo";
import { CustomerMongoRepository } from "../../../customer/infraestructure/repository/mongo.repository";
import { BudgetUseCases } from "../application/budgetUseCases";
import { BudgetController } from "./budget.ctrl";
import { asyncHandler } from "../../../middlewares/asyncHandlerMiddleware";
import { SaleMongoRepository } from "../../sale/infraestructure/sale.mongo";
import { zodValidator } from "../../../middlewares/zodValidator";
import {
  CreateBudgetSchema,
  EditBudgetSchema,
} from "../adapters/inputBudgetDTOs";
import { MongoRepository } from "../../../user/infraestructure/repository/mongo.repository";

export const router = Router();

const budgetrepo = new BudgetMongoRepository();
const customerrepo = new CustomerMongoRepository();
const salesrepo = new SaleMongoRepository();
const userrepo = new MongoRepository();
const usecases = new BudgetUseCases(
  budgetrepo,
  customerrepo,
  salesrepo,
  userrepo,
);
const ctrl = new BudgetController(usecases);

router.post(
  "/",
  zodValidator(CreateBudgetSchema),
  asyncHandler(ctrl.create.bind(ctrl)),
);
router.get("/", asyncHandler(ctrl.list.bind(ctrl)));
router.get("/:uuid", asyncHandler(ctrl.getDetails.bind(ctrl)));
router.patch(
  "/:uuid",
  zodValidator(EditBudgetSchema),
  asyncHandler(ctrl.updateStatus.bind(ctrl)),
);
