import { UserEntity } from "user/domain/user.entity";
import { UserRepository } from "user/domain/user.repository";
import { UserModel } from "../models/user.schema";

export class MongoRepository implements UserRepository {
  constructor() {}

  async createUser(user: UserEntity): Promise<UserEntity> {
    const savedUser = await UserModel.create(user);
    return savedUser;
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
