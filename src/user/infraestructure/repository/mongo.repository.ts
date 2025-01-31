import { UserEntity } from "user/domain/user.entity";
import { UserRepository } from "user/domain/user.repository";
import { UserModel } from "../models/user.schema";
import { UserValue } from "@/user/domain/user.value";

export class MongoRepository implements UserRepository {
  constructor() {}

  async createUser(user: UserEntity): Promise<UserEntity> {
    const newUser = new UserModel(user);
    const savedUser = await newUser.save();
    return new UserValue(savedUser);
  }

  async findUserByEmail(email: string): Promise<UserEntity | null> {
    const user = await UserModel.findOne({ email });
    return user;
  }

  async listUsers(): Promise<UserEntity[]> {
    const users = await UserModel.find({});
    return users;
  }
}
