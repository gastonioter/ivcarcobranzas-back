import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export function zodValidator(zodSchema: z.Schema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body);
      await zodSchema.parseAsync(req.body);

      next();
    } catch (err) {
      
      if (err instanceof z.ZodError) {
        const message = Object.values(err.flatten().fieldErrors)
          .flat()
          .join(", ");
        res.status(400).json({ error: message });
        return;
      }
    }
  };
}
