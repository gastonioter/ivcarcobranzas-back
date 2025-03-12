import { ValueObject } from "../domain/valueObject";

interface EmailValueProps {
  email: string;
}

export class Email extends ValueObject<EmailValueProps> {
  private constructor(props: EmailValueProps) {
    super(props);
  }

  static create(email: string): Email {
    if (!Email.isValidEmail(email)) {
      throw new Error("El correo electronico no es valido.");
    }
    return new Email({ email });
  }

  static fromExisting(email: string): Email {
    return new Email({ email });
  }

  getEmail(): string {
    return this.props.email;
  }

  private static isValidEmail(email: string): boolean {
    return email.includes("@");
  }
}
