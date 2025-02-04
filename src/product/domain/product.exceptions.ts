export class ProducAlreadyExistsError extends Error {
  constructor() {
    super("El producto ya existe");
    this.name = "ProducAlreadyExistsError";
  }
}
