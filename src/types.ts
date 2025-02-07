import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

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


export interface CustomJwtPayload extends JwtPayload {
  userId: string;
  role: string;
}

export type AsyncExpressHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;
