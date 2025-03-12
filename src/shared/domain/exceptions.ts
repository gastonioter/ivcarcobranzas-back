import { CustomError } from "../../types";

export class InvalidOperationError extends CustomError {
  constructor(message: string) {
    super(message, 400);
  }
}
