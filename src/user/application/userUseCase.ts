import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserEntity } from "../domain/user.entity";
import { UserRepository } from "../domain/user.repository";
import {
  LoginRequestDTO,
  RegisterRequestDTO,
  UserValue,
} from "../domain/user.value";
import { LoginError, UserAlreadyExistsError } from "../domain/user.exceptions";

export class UserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async createUser(userData: RegisterRequestDTO): Promise<UserEntity> {
    const userValue = new UserValue(userData);

    const userAlreadyExists = await this.userRepository.findUserByEmail(
      userValue.email
    );

    if (userAlreadyExists) {
      throw new UserAlreadyExistsError();
    }

    const newUser = await this.userRepository.createUser(userValue);

    return newUser;
  }

  public async login({ email, password }: LoginRequestDTO): Promise<string> {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new LoginError();
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new LoginError();
    }

    const token = jwt.sign(
      { id: user.uuid, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );
    return token;
  }
}
