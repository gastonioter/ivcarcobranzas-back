import { Document, model, Schema, InferSchemaType } from "mongoose";
import { Roles } from "user/domain/user.entity";

const userSchema = new Schema({
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: Object.values(Roles) },
  uuid: { type: String, required: true, unique: true },
  createdAt: { type: Date, required: true },
});

type UserDoc = InferSchemaType<typeof userSchema>;

export const UserModel = model<UserDoc>("User", userSchema);
