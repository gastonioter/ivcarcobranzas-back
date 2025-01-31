import { v4 as uuid } from "uuid";
import { z } from "zod";
import { Roles, UserEntity } from "./user.entity";
import { createRequestSchema } from "./user.validations";

export type RegisterRequestDTO = z.infer<typeof createRequestSchema>;
export type LoginRequestDTO = Pick<RegisterRequestDTO, "email" | "password">;

export class UserValue implements UserEntity {
  uuid: string;
  email: string;
  password: string;
  role: Roles;
  createdAt: Date;

  constructor(user: RegisterRequestDTO) {
    this.uuid = uuid();
    this.email = user.email;
    this.password = user.password;
    this.role = user.role;
    this.createdAt = new Date();
  }
}
