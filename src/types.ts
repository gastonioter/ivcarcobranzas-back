import { NextFunction, Request, Response } from "express";

export interface APIResponse<T> {
  data: T;
  message: string;
  status: "error" | "success";
}
export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export type AsyncExpressHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;
