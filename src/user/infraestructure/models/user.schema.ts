import { Document, model, Schema, InferSchemaType } from "mongoose";
import { Roles } from "user/domain/user.entity";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: Object.values(Roles) },
  uuid: { type: String, required: true, unique: true },
  createdAt: { type: Date, required: true },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

type UserDoc = InferSchemaType<typeof userSchema>;

export const UserModel = model<UserDoc>("User", userSchema);
