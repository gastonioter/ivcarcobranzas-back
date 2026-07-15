import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const EnvVariablesSchema = z.object({
  ENV: z.string(),

  API_PORT: z.string(),

  MONGO_HOST: z.string(),
  MONGO_PORT: z.string(),
  MONGO_DB: z.string(),
  MONGO_URL: z.string().optional(),

  OPENWA_BASE_URL: z.string(),
  OPENWA_API_KEY: z.string(),
  OPENWA_SESSION_ID: z.string(),

  JWT_SECRET: z.string(),

  RESEND_API_KEY: z.string(),

  ULTRAMSG_TOKEN: z.string(),
  ULTRAMSG_INSTANCE_ID: z.string(),
});

EnvVariablesSchema.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof EnvVariablesSchema> {}
  }
}
