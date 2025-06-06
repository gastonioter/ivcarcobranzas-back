import { APIResponse } from "@/types";
import { CreateUserUseCase } from "@/user/application/createUser.usecase";
import { Request, Response } from "express";

export class CreateUserController {
  constructor(private userUseCase: CreateUserUseCase) {}

  public createUser = async (req: Request, res: Response) => {
    const user = req.body;
    const createdUser = await this.userUseCase.createUser(user);

    res.status(200).json(createdUser);
  };
}
