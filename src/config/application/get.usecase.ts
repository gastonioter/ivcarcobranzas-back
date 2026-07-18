import { ConfigRepository } from "../domain/config.repository";
import { toDTO } from "../infra/config.dto";

export const defaultConfig = {
  globalCuotaPrice: 20_000,
};

export class GetConfigUC {
  constructor(private readonly repo: ConfigRepository) {}

  async execute() {
    const config = await this.repo.getConfig();
    if (!config) {
      console.log("no config found");
      return defaultConfig;
    }
    return toDTO(config);
  }
}
