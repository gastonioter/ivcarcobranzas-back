import { CustomError } from "../../types";

export class ProducAlreadyExistsError extends CustomError {
  constructor() {
    super("El producto ya existe", 400);
    this.name = "ProducAlreadyExistsError";
  }
}
