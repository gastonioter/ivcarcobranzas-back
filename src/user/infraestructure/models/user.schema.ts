import bcrypt from "bcrypt";
import { InferSchemaType, model, Schema } from "mongoose";
import { Roles } from "../../domain/user.entity";

const userSchema = new Schema({
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: Object.values(Roles) },
  uuid: { type: String, required: true, unique: true },
  fullname: { type: String, required: true },
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
