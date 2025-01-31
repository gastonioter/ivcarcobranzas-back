import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const EnvVariablesSchema = z.object({
  API_PORT: z.string(),
  NODE_ENV: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.string(),
  DB_NAME: z.string(),
  JWT_SECRET: z.string(),
});

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof EnvVariablesSchema> {}
  }
}
