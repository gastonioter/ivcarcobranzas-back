import { ResourceNotFoundException } from "../../shared/domain/exceptions";
import { ConfigRepository } from "../domain/config.repository";
import { ConfigDTO, toDTO } from "../infra/config.dto";

type SetConfigDTO = Partial<ConfigDTO>;

export class SetConfigUC {
  constructor(private readonly repo: ConfigRepository) {}

  async execute(dto: SetConfigDTO) {
    const config = await this.repo.getConfig();

    if (!config) {
      throw new ResourceNotFoundException("Config", "config");
    }

    if (dto.globalCuotaPrice !== undefined) {
      config.globalCuotaPrice = dto.globalCuotaPrice;
    }

    await this.repo.save(config);

    return toDTO(config);
  }
}
