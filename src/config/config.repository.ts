import { Config } from "./config";
import { ConfigModel } from "./config.schema";

export interface ConfigRepository {
  getConfig(): Promise<Config>;
  save(config: Config): Promise<void>;
}

export class MongoConfigRepository implements ConfigRepository {
  async getConfig(): Promise<Config> {
    const configDoc = await ConfigModel.findOne();
    if (!configDoc) {
      throw new Error("Configuration not found");
    }
    return Config.fromPersistence(configDoc);
  }

  async save(config: Config): Promise<void> {
    // Implement the logic to save the configuration to MongoDB
    // For example, you can use a Mongoose model to update the config document
    await ConfigModel.findOneAndUpdate({}, config, { upsert: true, new: true });
  }
}
