import { Request, Response } from "express";
import { SetConfigUC } from "../application/edit.usecase";
import { GetConfigUC } from "../application/get.usecase";

export class ConfigController {
  constructor(
    private readonly getUC: GetConfigUC,
    private readonly setUC: SetConfigUC,
  ) {}

  get = async (req: Request, res: Response) => {
    const config = await this.getUC.execute();
    res.json(config);
  };

  save = async (req: Request, res: Response) => {
    const data = req.body;
    const result = await this.setUC.execute(data);
    res.json(result);
  };
}
