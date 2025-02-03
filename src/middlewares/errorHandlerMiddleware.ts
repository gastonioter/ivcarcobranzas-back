import { CustomError } from "@/types";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export default function errorHandler(
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);

  const status = err.statusCode || 500;
  const message = err.message || "Internal server error";

  res.status(status).json({ error: message });
}
