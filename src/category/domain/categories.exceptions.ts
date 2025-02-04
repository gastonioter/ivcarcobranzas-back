export class CategoryAlreadyExists extends Error {
  constructor() {
    super("La categoría ya existe");
    this.name = "CategoryAlreadyExists";
  }
}
