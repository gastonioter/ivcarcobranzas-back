import { UserEntity } from "../domain/user.entity";
import { UserAlreadyExistsError } from "../domain/user.exceptions";
import { UserRepository } from "../domain/user.repository";
import { RegisterRequestDTO } from "../domain/user.validations";
import { UserValue } from "../domain/user.value";

export class CreateUserUseCase {
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
}
