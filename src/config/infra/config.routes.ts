import { Router } from "express";
import { SetConfigUC } from "../application/edit.usecase";
import { GetConfigUC } from "../application/get.usecase";
import { MongoConfigRepository } from "./mongo.repository";
import { ConfigController } from "./config.controller";

export const router = Router();

const configRepo = new MongoConfigRepository();
const setUC = new SetConfigUC(configRepo);
const getUC = new GetConfigUC(configRepo);

const controller = new ConfigController(getUC, setUC);

router.get("/", controller.get);
router.post("/", controller.save);
