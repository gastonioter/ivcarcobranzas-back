export class CategoryAlreadyExists extends Error {
  constructor() {
    super("Category already exists");
    this.name = "CategoryAlreadyExists";
  }
}
