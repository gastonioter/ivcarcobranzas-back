import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export function zodValidator(zodSchema: z.ZodObject<any, any>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    try {
      await zodSchema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.flatten().fieldErrors });
      }
    }
  };
}
