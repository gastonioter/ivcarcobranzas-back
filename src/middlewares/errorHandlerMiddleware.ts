import { CustomerAlreadyExistsError } from "@/customer/domain/customer.exceptions";
import { CustomError } from "@/types";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import z from "zod";

export default function errorHandler(
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(err);

  const status = err.statusCode || 500;
  const message = err.message || "Internal server error";

  if (err instanceof z.ZodError) {
    err.errors.forEach((err) => {
      res.status(404).json({ error: err.message });
      console.log(`Zod error: ${err.message}`);
      return;
    });
  }

  res.status(status).json({ error: message });
}
