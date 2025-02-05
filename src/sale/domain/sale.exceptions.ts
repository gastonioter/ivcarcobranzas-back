import { CustomError } from "../../types";

export class SaleNotFoundError extends CustomError {
  constructor(id: string) {
    super(`La venta ${id} no existe`, 404);
  }
}
