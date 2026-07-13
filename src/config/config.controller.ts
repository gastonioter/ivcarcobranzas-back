import { Config } from "./config";
import { ConfigRepository } from "./config.repository";
import { Request, Response } from "express";

const DEFAULT_GLOBAL_CUOTA_PRICE = 20_000;

const DEFAULT_POLICY_PRICE = {
  1: 20_000,
  2: 25_000,
  3: 30_000,
};
export class ConfigController {
  constructor(private readonly repository: ConfigRepository) {}

  get = async (req: Request, res: Response) => {
    const config = await this.repository.getConfig();
    if (!config) {
      res.json({
        globalCuotaPrice: DEFAULT_GLOBAL_CUOTA_PRICE,
        pricePolicy: DEFAULT_POLICY_PRICE,
      });
    }
    res.json(config);
  };

  save = async () => {};
}
