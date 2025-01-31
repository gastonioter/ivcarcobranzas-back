import { v4 as uuid } from "uuid";
import { z } from "zod";
import { Roles, UserEntity } from "./user.entity";
import { createUserValidation } from "./user.validations";

export type CreateUserDTO = z.infer<typeof createUserValidation>;

export class UserValue implements UserEntity {
  uuid: string;
  email: string;
  password: string;
  role: Roles;
  createdAt: Date;

  constructor(user: CreateUserDTO) {
    this.uuid = uuid();
    this.email = user.email;
    this.password = user.password;
    this.role = user.role;
    this.createdAt = new Date();
  }
}
