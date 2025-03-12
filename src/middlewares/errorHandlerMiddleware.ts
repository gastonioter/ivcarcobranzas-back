import { CustomError } from "@/types";
import { NextFunction, Request, Response } from "express";

export default function errorHandler(
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(err);

  let status = err.statusCode || 500;
  let message = err.message || "Internal server error";

  res.status(status).json({ error: message });
}
