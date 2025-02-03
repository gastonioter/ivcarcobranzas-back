import { CustomError } from "../../types";

export class UserAlreadyExistsError extends CustomError {
  constructor() {
    super("El usuario ya existe", 400);
  }
}

export class LoginError extends CustomError {
  constructor() {
    super("El usuario no existe", 404);
  }
}
