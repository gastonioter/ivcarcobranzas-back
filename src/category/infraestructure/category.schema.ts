import { InferSchemaType, model, Schema } from "mongoose";

export interface ICategory extends Document {
  uuid: string;
  name: string;
  description: string;
  createdAt: string;
}
const CategorySchema = new Schema<ICategory>({
  uuid: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  description: { type: String, default: "" },
  createdAt: { type: Date, required: true },
});

export type CategoryDoc = InferSchemaType<typeof CategorySchema>;

export const CategoryModel = model<CategoryDoc>("Category", CategorySchema);
