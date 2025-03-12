import { CustomError } from "../../types";

export class InvalidCustomerDataError extends CustomError {
  constructor() {
    super("Datos de cliente inválidos", 400);
    this.name = "InvalidCustomerDataError";
  }
}
export class CustomerNotFoundError extends CustomError {
  constructor() {
    super("Cliente no encontrado", 404);
    this.name = "CustomerNotFoundError";
  }
}

export class InvalidCustomerTypeError extends CustomError {
  constructor() {
    super("El monto mensual es requerido para los clientes cloud", 400);
    this.name = "InvalidCustomerTypeError";
  }
}

export class InvalidMontoMensualError extends CustomError {
  constructor() {
    super("El monto mensual debe ser mayor a 0", 400);
    this.name = "InvalidMontoMensualError";
  }
}
export class CustomerAlreadyExistsError extends CustomError {
  constructor() {
    super("El cliente ya existe", 400);
    this.name = "CustomerAlreadyExistsError";
  }
}
