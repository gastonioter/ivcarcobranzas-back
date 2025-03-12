import { CustomJwtPayload } from "@/types";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      role?: string;
      userId?: string;
    }
  }
}

export const authorizationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      res.status(401).json("Su sesion ha expirado");
      return;
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      res.status(401).json("Su sesion ha expirado");
      return;
    }

    const decoded = verify(token, process.env.JWT_SECRET) as CustomJwtPayload;

    req.role = decoded.role;
    req.userId = decoded.id;

    next();
  } catch (error) {
    res.status(401).json("Su sesion ha expirado");
  }
};
