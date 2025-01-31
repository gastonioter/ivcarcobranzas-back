import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export default function errorHandler(
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);

  res.status(500).json({ error: "Internal server error" });
}
