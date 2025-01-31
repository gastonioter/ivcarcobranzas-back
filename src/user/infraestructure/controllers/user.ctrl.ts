import { UserAlreadyExistsError } from "../../domain/user.exceptions";
import { NextFunction, Request, Response } from "express";
import { UserUseCase } from "user/application/userUseCase";

export class UserController {
  constructor(private userUseCase: UserUseCase) {}

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

  public listUsers = async (req: Request, res: Response) => {};

  public login = async (req: Request, res: Response) => {
    const { email = "", password = "" } = req.body;
    const token = await this.userUseCase.login({ email, password });
    res.status(200).json({ token });
  };
}
