import { Router } from "express";
import { LoginUseCase } from "../../application/login.usecase";
import { MongoRepository } from "../repository/mongo.repository";

import { CreateUserUseCase } from "../../application/createUser.usecase";
import { loginRequestSchema } from "../../domain/user.validations";
import { zodValidator } from "../../../middlewares/zodValidator";
import { CreateUserController } from "../controllers/createUser.ctrl";
import { LoginController } from "../controllers/login.ctrl";
import { asyncHandler } from "../../../middlewares/asyncHandlerMiddleware";

export const route = Router();

const mongoRepository = new MongoRepository();

const loginUserCase = new LoginUseCase(mongoRepository);
const createUserUseCase = new CreateUserUseCase(mongoRepository);

const createUserController = new CreateUserController(createUserUseCase);
const loginController = new LoginController(loginUserCase);

route.post(
  "/login",
  zodValidator(loginRequestSchema),
  asyncHandler(loginController.login)
);
route.post(
  "/register",
  zodValidator(loginRequestSchema),
  asyncHandler(createUserController.createUser)
);
