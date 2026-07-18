import { Config } from "./config.entity";
import { ConfigModel } from "../infra/config.schema";

export interface ConfigRepository {
  getConfig(): Promise<Config | null>;
  save(config: Config): Promise<void>;
}
