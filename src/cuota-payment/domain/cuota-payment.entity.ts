import { Entity } from "../../shared/domain/Entity";
import { EntityId } from "../../shared/valueObjects/entityId.vo";

export interface PaymentLine {
  cuotaId: string;
  month: number;
  year: number;
  amount: number;
}

export interface CuotaPaymentProps {
  uuid: EntityId;
  customerId: string;
  sent: boolean;
  lines: PaymentLine[];
  serie: string;
  createdAt: Date;
}

export class CuotaPayment extends Entity {
  private _customerId: string;
  private _lines: PaymentLine[];
  private _serie: string;
  private _sent: boolean;
  private _createdAt: Date;

  private constructor(props: CuotaPaymentProps) {
    super(props.uuid);
    this._customerId = props.customerId;
    this._lines = props.lines;
    this._serie = props.serie;
    this._sent = props.sent;
    this._createdAt = props.createdAt;
  }

  static new(
    customerId: string,
    cuotas: { uuid: string; month: number; year: number; amount: number }[],
  ): CuotaPayment {
    if (cuotas.length === 0)
      throw new Error("El pago debe incluir al menos una cuota.");

    const uuid = EntityId.create();
    const lines: PaymentLine[] = cuotas.map((c) => ({
      cuotaId: c.uuid,
      month: c.month,
      year: c.year,
      amount: c.amount,
    }));

    return new CuotaPayment({
      uuid,
      customerId,
      lines,
      sent: false,
      serie: `PAG-${uuid.getId().substring(0, 8).toUpperCase()}`,
      createdAt: new Date(),
    });
  }

  static fromPersistence(data: {
    uuid: string;
    customerId: string;
    lines: PaymentLine[];
    serie: string;
    createdAt: Date;
    sent: boolean;
  }): CuotaPayment {
    return new CuotaPayment({
      uuid: EntityId.fromExisting(data.uuid),
      customerId: data.customerId,
      lines: data.lines,
      serie: data.serie,
      sent: data.sent,
      createdAt: data.createdAt,
    });
  }

  get customerId(): string {
    return this._customerId;
  }

  get lines(): PaymentLine[] {
    return this._lines;
  }

  get serie(): string {
    return this._serie;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get total(): number {
    return this._lines.reduce((acc, l) => acc + l.amount, 0);
  }

  get sent(): boolean {
    return this._sent;
  }

  set sent(value: boolean) {
    this._sent = value;
  }

  get lineCount(): number {
    return this._lines.length;
  }
}
