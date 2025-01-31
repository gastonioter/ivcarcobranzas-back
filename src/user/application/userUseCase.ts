import { UserEntity } from "user/domain/user.entity";
import { UserRepository } from "user/domain/user.repository";
import { createUserValidation } from "user/domain/user.validations";
import { UserValue } from "user/domain/user.value";

export class UserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async createUser(userData: unknown): Promise<UserEntity> {
    const isValidPayload = createUserValidation.safeParse(userData);
    if (!isValidPayload.success) {
      throw new Error(isValidPayload.error.message);
    }

    const userValue = new UserValue(isValidPayload.data);

    const user = await this.userRepository.createUser(userValue);

    return user;
  }
}
