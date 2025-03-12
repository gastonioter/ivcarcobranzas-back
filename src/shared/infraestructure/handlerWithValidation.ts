import { Request, RequestHandler, Response } from "express";
import { Schema } from "zod";

export const handlerWithValidation =
  <T>(
    schema: Schema<T>,
    handler: (req: Request, res: Response) => Promise<void>,
  ) =>
  (req: Request<any, any, T, any, any>, res: Response) => {
    const bodyResult = schema.safeParse(req);
    if (!bodyResult.success) {
      return res.status(400).json(bodyResult.error.message);
    }

    handler(req, res);
  };
