import { CustomError } from "../../types";

export class CategoryAlreadyExists extends CustomError {
  constructor() {
    super("La categoría ya existe", 400);
    this.name = "CategoryAlreadyExists";
  }
}
