import { CategoryDoc } from "@/categories/infraestructure/model/category.schema";
import { InferSchemaType, model, Schema } from "mongoose";

const ProductSchema = new Schema({
  uuid: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  code: { type: String, required: true, unique: true },
  categoryId: { type: String },
});

// Definimos una virtual para hacer el populate usando categoryCode y code
ProductSchema.virtual("categoryData", {
  ref: "Category", // El modelo a referenciar
  localField: "categoryId", // El campo en Product
  foreignField: "uuid", // El campo en Category a comparar
  justOne: true, // Si es una relación uno a uno
});

// Es importante habilitar la inclusión de virtuales en la salida JSON/u objeto
ProductSchema.set("toObject", { virtuals: true });
ProductSchema.set("toJSON", { virtuals: true });

export type ProductDoc = InferSchemaType<typeof ProductSchema>;

export type ProductWithCategoryDoc = ProductDoc & {
  categoryData: CategoryDoc;
};

export const ProductModel = model<ProductDoc>("Product", ProductSchema);
