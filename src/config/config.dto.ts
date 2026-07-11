import { Config, PricePolicy } from "./config";

export interface ConfigDTO {
  globalCuotaPrice: number;
  pricePolicy?: PricePolicy;
}

export const toDTO = (config: Config): ConfigDTO => {
  return {
    globalCuotaPrice: config.globalCuotaPrice.value,
    pricePolicy: config.pricePolicy,
  };
};
export type CreateConfigDTO = ConfigDTO;
