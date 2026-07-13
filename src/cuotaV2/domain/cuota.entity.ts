import { Price } from "../../shared/valueObjects/price.vo";
import { Entity } from "../../shared/domain/Entity";
import { EntityId } from "../../shared/valueObjects/entityId.vo";
import { CuotaDoc } from "../infra/cuota.schema";

export interface CuotaProps {
  uuid: EntityId;
  customerId: string;
  year: number;
  month: number;
  amount: Price;
  status: CuotaStatus;
  sequence: number;
  createdAt: Date;
}

export class Cuota extends Entity {
  private _customerId: string;
  private _year: number;
  private _month: number;
  private _amount: Price;
  private _status: CuotaStatus;
  private _sequence: number;
  private _createdAt: Date;

  private constructor(props: CuotaProps) {
    super(props.uuid);
    this._customerId = props.customerId;
    this._amount = props.amount;
    this._month = props.month;
    this._year = props.year;
    this._status = props.status;
    this._sequence = props.sequence;
    this._createdAt = props.createdAt;
  }

  public static new({
    customerId,
    amount,
    year,
    month,
    status,
    sequence,
  }: {
    customerId: string;
    amount: number;
    year: number;
    month: number;
    status: CuotaStatus.PENDING | CuotaStatus.NO_SERVICE;
    sequence: number;
  }): Cuota {
    if (!year || !month) throw new Error("El mes y anio son obligatorios");

    return new Cuota({
      customerId,
      uuid: EntityId.create(),
      month,
      year,
      amount: Price.of(amount),
      status,
      createdAt: new Date(),
      sequence,
    });
  }

  public static fromPersistence(persisted: CuotaDoc): Cuota {
    return new Cuota({
      customerId: persisted.customerId,
      uuid: EntityId.fromExisting(persisted.uuid),
      month: persisted.month,
      year: persisted.year,
      amount: Price.of(persisted.amount),
      status: persisted.status,
      createdAt: persisted.createdAt,
      sequence: persisted.sequence,
    });
  }

  get sequence(): number {
    return this._sequence;
  }

  getSerie(): string {
    return `CUOTA-${this._sequence.toString().padStart(5, "0")}`;
  }
  get customerId(): string {
    return this._customerId;
  }

  get year(): number {
    return this._year;
  }

  get month(): number {
    return this._month;
  }

  get amount(): number {
    return this._amount.value;
  }

  set amount(value: number) {
    this._amount = Price.of(value);
  }

  set sequence(value: number) {
    this._sequence = value;
  }

  get status(): CuotaStatus {
    return this._status;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  isDelayed(): boolean {
    const today = new Date();
    return today.getMonth() > this._month && today.getFullYear() === this._year;
  }

  isPaid(): boolean {
    return this._status === CuotaStatus.PAID;
  }

  delay(): void {
    if (this.isDelayed()) {
      this._status = CuotaStatus.LATE;
    }
  }

  setState(status: CuotaStatus): void {
    if (this._status === CuotaStatus.PAID) {
      throw new Error("La cuota ya esta paga");
    }
    this._status = status;
  }

  markAsNoService(): void {
    if (this._status === CuotaStatus.PAID)
      throw new Error("Una cuota pagada no puede marcarse como sin servicio");
    this._status = CuotaStatus.NO_SERVICE;
  }

  reactivate(): void {
    if (this._status !== CuotaStatus.NO_SERVICE)
      throw new Error(
        "Solo se puede reactivar una cuota en estado sin servicio",
      );
    this._status = CuotaStatus.PENDING;
  }
}

export enum CuotaStatus {
  PENDING = "PENDIENTE",
  PAID = "PAGADA",
  LATE = "ATRASADA",
  NO_SERVICE = "SIN SERVICIO",
}

export enum CuotaMonths {
  ENERO = "Enero",
  FEBRERO = "Febrero",
  MARZO = "Marzo",
  ABRIL = "Abril",
  MAYO = "Mayo",
  JUNIO = "Junio",
  JULIO = "Julio",
  AGOSTO = "Agosto",
  SEPTIEMBRE = "Septiembre",
  OCTUBRE = "Octubre",
  NOVIEMBRE = "Noviembre",
  DICIEMBRE = "Diciembre",
}

export const mesesMap = {
  [CuotaMonths.ENERO]: 1,
  [CuotaMonths.FEBRERO]: 2,
  [CuotaMonths.MARZO]: 3,
  [CuotaMonths.ABRIL]: 4,
  [CuotaMonths.MAYO]: 5,
  [CuotaMonths.JUNIO]: 6,
  [CuotaMonths.JULIO]: 7,
  [CuotaMonths.AGOSTO]: 8,
  [CuotaMonths.SEPTIEMBRE]: 9,
  [CuotaMonths.OCTUBRE]: 10,
  [CuotaMonths.NOVIEMBRE]: 11,
  [CuotaMonths.DICIEMBRE]: 12,
};
