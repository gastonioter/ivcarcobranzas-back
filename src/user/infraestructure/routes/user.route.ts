import { Router } from "express";
import { MongoRepository } from "../repository/mongo.repository";
import { UserUseCase } from "user/application/userUseCase";
import { UserController } from "../controllers/user.ctrl";

export const route = Router();

const mongoRepository = new MongoRepository();

const userUserCase = new UserUseCase(mongoRepository);

const userController = new UserController(userUserCase);

route.post("/users", userController.createUser);
route.get("/users", userController.listUsers);
route.get("/users/:email", userController.findUserByEmail);
