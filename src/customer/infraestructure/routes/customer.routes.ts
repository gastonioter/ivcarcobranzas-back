import { Router } from "express";
import { CustomerMongoRepository } from "../repository/mongo.repository";
import { CustomerUseCases } from "@/customer/application/custumerUseCases";

export const routes = Router();

const CustomerRepo = new CustomerMongoRepository();
const customerUseCases = new CustomerUseCases(CustomerRepo);
