import { Router } from "express";
import { PaymentMongoRespository } from "./payment.mongo";
import { PaymentUseCases } from "../application/paymentUseCases";
import { PaymentController } from "./payment.ctrl";

export const router = Router();

const paymentUseCases = new PaymentUseCases(new PaymentMongoRespository());

const paymentController = new PaymentController(paymentUseCases);

router.post("/", paymentController.createPayment);

router.get("/", paymentController.findAllPayments);
