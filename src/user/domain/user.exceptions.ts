export class UserAlreadyExistsError extends Error {
  constructor() {
    super("El usuario ya existe");
  }
}

export class LoginError extends Error {
  constructor() {
    super("El usuario no existe");
  }
}
