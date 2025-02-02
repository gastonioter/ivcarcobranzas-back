import { v4 as uuid } from "uuid";
import { Roles, UserEntity } from "./user.entity";
import { RegisterRequestDTO } from "./user.validations";

export class UserValue implements UserEntity {
  uuid: string;
  email: string;
  password: string;
  role: Roles;
  fullname: string;
  createdAt: Date;

  constructor(user: RegisterRequestDTO) {
    this.uuid = uuid();
    this.email = user.email;
    this.password = user.password;
    this.role = user.role;
    this.fullname = user.fullname;
    this.createdAt = new Date();
  }
}
