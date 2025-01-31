import { Router } from "express";
import { MongoRepository } from "../repository/mongo.repository";
import { UserUseCase } from "../../application/userUseCase";
import { UserController } from "../controllers/user.ctrl";
import { zodValidator } from "../middlewares/zodValidator";
import {
  createRequestSchema,
  loginRequestSchema,
} from "../../domain/user.validations";

export const route = Router();

const mongoRepository = new MongoRepository();

const userUserCase = new UserUseCase(mongoRepository);

const userController = new UserController(userUserCase);

route.post("/login", zodValidator(loginRequestSchema), userController.login);
route.post(
  "/register",
  zodValidator(loginRequestSchema),
  userController.createUser
);
