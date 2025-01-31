import { UserEntity } from "./user.entity";

export interface UserRepository {
  createUser(user: UserEntity): Promise<UserEntity>;
  findUserByEmail(email: string): Promise<UserEntity | null>;
  listUsers(): Promise<UserEntity[]>;
}
