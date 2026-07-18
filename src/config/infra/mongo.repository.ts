import { Config } from "../domain/config.entity";
import { ConfigRepository } from "../domain/config.repository";
import { ConfigModel } from "./config.schema";

export class MongoConfigRepository implements ConfigRepository {
  async getConfig(): Promise<Config | null> {
    const configDoc = await ConfigModel.findOne();
    if (!configDoc) {
      return null;
    }
    return Config.fromPersistence(configDoc);
  }

  async save(config: Config): Promise<void> {
    await ConfigModel.findOneAndUpdate({}, config, { new: true });
  }
}
