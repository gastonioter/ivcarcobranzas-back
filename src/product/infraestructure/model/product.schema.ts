import { CategoryDoc } from "@/category/infraestructure/model/category.schema";
import { InferSchemaType, model, Schema } from "mongoose";

const ProductSchema = new Schema({
  uuid: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  code: { type: String, required: true, unique: true },
  createdAt: { type: Date, required: true },
  categoryId: { type: String, required: true },
});

ProductSchema.virtual("category", {
  ref: "Category",
  localField: "categoryId",
  foreignField: "uuid",
  justOne: true,
});

ProductSchema.set("toObject", { virtuals: true });
ProductSchema.set("toJSON", { virtuals: true });

export type ProductDoc = InferSchemaType<typeof ProductSchema>;

export type ProductWithCategoryDoc = ProductDoc & {
  category: CategoryDoc;
};

export const ProductModel = model<ProductDoc>("Product", ProductSchema);
