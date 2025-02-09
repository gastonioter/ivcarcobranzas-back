import { shallowEqual } from "shallow-equal-object";

interface ValueObjectProps {
  [index: string]: any;
}

export abstract class ValueObject<T extends ValueObjectProps> {
  public readonly props: T;

  constructor(props: T) {
    this.props = Object.freeze(props);
  }

  public equals(vo: ValueObject<T>): boolean {
    
    return shallowEqual(this.props, vo.props);
  }
}

/* Subclasses of this Value Object base class can also be extended to include convenience methods like greaterThan(vo?: ValueObject<T>) or lessThan(vo?: ValueObject<T>). Usful for something like LoggingLevels or BusinessRatings. */
