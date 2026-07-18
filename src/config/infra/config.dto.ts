import { Config } from "../domain/config.entity";

export interface ConfigDTO {
  globalCuotaPrice: number;
}

export type PricePolicy = Record<number, number>;

export const toDTO = (config: Config): ConfigDTO => {
  return {
    globalCuotaPrice: config.globalCuotaPrice.value,
  };
};
export type CreateConfigDTO = ConfigDTO;
