import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserEntity } from "user/domain/user.entity";
import { UserRepository } from "user/domain/user.repository";
import {
  LoginRequestDTO,
  RegisterRequestDTO,
  UserValue,
} from "user/domain/user.value";

export class UserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async createUser(userData: RegisterRequestDTO): Promise<UserEntity> {
    const userValue = new UserValue(userData);

    const newUser = await this.userRepository.createUser(userValue);

    return newUser;
  }

  public async login({ email, password }: LoginRequestDTO): Promise<string> {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Contraseña incorrecta");
    }

    const token = jwt.sign(
      { id: user.uuid, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );
    return token;
  }
}
