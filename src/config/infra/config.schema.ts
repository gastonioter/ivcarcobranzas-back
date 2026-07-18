import { Schema, InferSchemaType, model } from "mongoose";

const ConfigSchema = new Schema(
  {
    globalCuotaPrice: { type: Number, required: true },
  },
  { _id: false },
);

export type ConfigDoc = InferSchemaType<typeof ConfigSchema>;

export const ConfigModel = model("Config", ConfigSchema);
