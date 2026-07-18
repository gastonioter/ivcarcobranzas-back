import { CustomError } from "../../types";

export class InvalidOperationError extends CustomError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class ResourceNotFoundException extends Error {
  constructor(
    public readonly resourceName: string,
    public readonly id: string,
  ) {
    super(`${resourceName} with ID ${id} was not found.`);
    this.name = "ResourceNotFoundException";
  }
}
