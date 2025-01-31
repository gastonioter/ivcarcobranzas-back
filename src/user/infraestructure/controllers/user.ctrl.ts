import { Request, Response } from "express";
import { UserUseCase } from "user/application/userUseCase";

export class UserController {
  constructor(private userUseCase: UserUseCase) {}

  public createUser = async (req: Request, res: Response) => {
    const user = req.body;
    const createdUser = await this.userUseCase.createUser(user);
    res.status(201).json(createdUser);
  };

  public listUsers = async (req: Request, res: Response) => {};

  public login = async (req: Request, res: Response) => {
    const { email = "", password = "" } = req.body;
    const token = await this.userUseCase.login({ email, password });
    res.status(200).json({ token });
  };
}
