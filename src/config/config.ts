import { Price } from "../shared/valueObjects/price.vo";
import { CreateConfigDTO } from "./config.dto";
import { ConfigDoc } from "./config.schema";

export interface ConfigProps {
  globalCuotaPrice: Price; // this is the price of a cuota, used for manual cuotas generation
  pricePolicy?: PricePolicy | undefined;
}

// This reflects the price depending on the amount of modules per customer.
export type PricePolicy = Record<number, Price>;

export class Config {
  private _globalCuotaPrice: Price;
  private _pricePolicy?: PricePolicy;

  private constructor(props: ConfigProps) {
    this._globalCuotaPrice = props.globalCuotaPrice;
    this._pricePolicy = props.pricePolicy;
  }

  static new(props: CreateConfigDTO): Config {
    return new Config({
      globalCuotaPrice: Price.of(props.globalCuotaPrice),
      pricePolicy: props.pricePolicy,
    });
  }

  static fromPersistence(data: ConfigDoc): Config {
    return Config.new({
      globalCuotaPrice: data.globalCuotaPrice,
      pricePolicy: data.pricePolicy as unknown as PricePolicy,
    });
  }

  get globalCuotaPrice(): Price {
    return this._globalCuotaPrice;
  }

  get pricePolicy(): PricePolicy | undefined {
    return this._pricePolicy ?? undefined;
  }

  set globalCuotaPrice(value: number) {
    this._globalCuotaPrice = Price.of(value);
  }
}
