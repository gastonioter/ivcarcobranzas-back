import { CreateUserUseCase } from "@/user/application/createUser.usecase";
import { NextFunction, Request, Response } from "express";
import { UserAlreadyExistsError } from "../../domain/user.exceptions";

export class CreateUserController {
  constructor(private userUseCase: CreateUserUseCase) {}

  public createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = req.body;
      const createdUser = await this.userUseCase.createUser(user);
      res.status(201).json(createdUser);
    } catch (e) {
      if (e instanceof UserAlreadyExistsError) {
        res.status(409).json({ error: e.message });
      }
      next(e);
    }
  };
}
