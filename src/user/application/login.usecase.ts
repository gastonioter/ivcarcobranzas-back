import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { LoginError } from "../domain/user.exceptions";
import { UserRepository } from "../domain/user.repository";
import { LoginRequestDTO } from "../domain/user.validations";

export class LoginUseCase {
  constructor(private readonly userRepository: UserRepository) {}

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
      { userId: user.uuid, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" },
    );
    return token;
  }
}
