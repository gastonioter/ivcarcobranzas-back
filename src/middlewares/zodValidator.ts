import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export function zodValidator(zodSchema: z.Schema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await zodSchema.parseAsync(req.body);

      next();
    } catch (err) {
      if (err instanceof z.ZodError) {
        const message =
          Object.values(err.flatten().fieldErrors).flat().at(0) ||
          "Invalid request data";
        res.status(400).json({ error: message });
        return;
      }
    }
  };
}
