import { ValueObject } from "../domain/valueObject";

interface PriceProps {
  amount: number;
}

export class Price extends ValueObject<PriceProps> {
  private constructor(props: PriceProps) {
    super(props);
  }

  static of(amount: number): Price {
    if (amount <= 0) throw new Error("El precio debe ser mayor a cero");
    return new Price({ amount });
  }

  static fromPersistence(amount: number): Price {
    return new Price({ amount });
  }

  get value(): number {
    return this.props.amount;
  }

  add(other: Price): Price {
    return new Price({ amount: this.props.amount + other.props.amount });
  }

  multiply(factor: number): Price {
    if (factor < 0) throw new Error("El factor no puede ser negativo");
    return new Price({ amount: this.props.amount * factor });
  }
}