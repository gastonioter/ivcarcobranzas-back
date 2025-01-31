import { Router } from "express";
import { MongoRepository } from "../repository/mongo.repository";
import { UserUseCase } from "user/application/userUseCase";
import { UserController } from "../controllers/user.ctrl";
import { zodValidator } from "../middlewares/zodValidator";
import {
  createRequestSchema,
  loginRequestSchema,
} from "user/domain/user.validations";

export const route = Router();

const mongoRepository = new MongoRepository();

const userUserCase = new UserUseCase(mongoRepository);

const userController = new UserController(userUserCase);

route.post(
  "/users/login",
  zodValidator(createRequestSchema),
  userController.login
);
route.post(
  "/users/register",
  zodValidator(loginRequestSchema),
  userController.createUser
);
