import { LoginUseCase } from "@/user/application/login.usecase";
import { Request, Response } from "express";

export class LoginController {
  constructor(private loginUseCase: LoginUseCase) {}

  public login = async (req: Request, res: Response) => {
    const { email = "", password = "" } = req.body;
    const token = await this.loginUseCase.login({ email, password });
    res.status(200).json({ token });
  };
}
