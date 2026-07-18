import { Price } from "../../shared/valueObjects/price.vo";
import { CreateConfigDTO } from "../infra/config.dto";
import { ConfigDoc } from "../infra/config.schema";

export interface ConfigProps {
  globalCuotaPrice: Price;
}

export type PricePolicy = Record<number, Price>;

export class Config {
  private _globalCuotaPrice: Price;

  private constructor(props: ConfigProps) {
    this._globalCuotaPrice = props.globalCuotaPrice;
  }

  static new(props: CreateConfigDTO): Config {
    return new Config({
      globalCuotaPrice: Price.of(props.globalCuotaPrice),
    });
  }

  static fromPersistence(data: ConfigDoc): Config {
    return Config.new({
      globalCuotaPrice: data.globalCuotaPrice,
    });
  }

  get globalCuotaPrice(): Price {
    return this._globalCuotaPrice;
  }

  set globalCuotaPrice(value: number) {
    this._globalCuotaPrice = Price.of(value);
  }
}
