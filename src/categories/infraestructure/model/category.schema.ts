import { InferSchemaType, model, Schema } from "mongoose";

const CategorySchema = new Schema({
  uuid: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  description: { type: String },
});

type CategoryDoc = InferSchemaType<typeof CategorySchema>;

export const CategoryModel = model<CategoryDoc>("Category", CategorySchema);
