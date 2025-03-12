export abstract class BaseDTO<T> {
  constructor(entity: T) {
    Object.assign(this, entity);
  }
}
