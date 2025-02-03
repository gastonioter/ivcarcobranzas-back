import { CreateUserUseCase } from "@/user/application/createUser.usecase";
import { NextFunction, Request, Response } from "express";
import { UserAlreadyExistsError } from "../../domain/user.exceptions";
import { APIResponse } from "@/types";

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

      const response: APIResponse<typeof createdUser> = {
        message: "User created",
        data: createdUser,
        status: "success",
      };

      res.status(201).json(response);
    } catch (e) {
      if (e instanceof UserAlreadyExistsError) {
        const response: APIResponse<null> = {
          message: e.message,
          data: null,
          status: "error",
        };

        res.status(409).json(response);
      }
      next(e);
    }
  };
}
