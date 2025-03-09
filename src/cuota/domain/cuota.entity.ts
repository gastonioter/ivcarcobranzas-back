import { Entity } from "../../shared/domain/Entity";
import { EntityId } from "../../shared/valueObjects/entityId.vo";
import { CuotaPersistence } from "../infraestrcture/cuota.schema";

const BASE_SERIE = 1000;

export class Cuota extends Entity {
  private year: number;
  private month: number;
  private amount: number;
  private status: CuotaStatus;
  private createdAt: Date;
  private serie: string;

  private constructor(
    uuid: EntityId,
    month: number,
    year: number,
    amount: number,
    status: CuotaStatus,
    createdAt: Date,
    serie: string,
  ) {
    super(uuid);
    this.amount = amount;
    this.month = month;
    this.year = year;
    this.status = status;
    this.createdAt = createdAt;
    this.serie = serie;
  }

  private static generateSerie(sec: number) {
    return `${String(sec + BASE_SERIE).padStart(8, "0")}`;
  }

  public static new({
    amount,
    secuence,
    year,
    month,
    status,
  }: {
    amount: number;
    secuence: number;
    year: number;
    month: number;
    status: CuotaStatus.PENDING | CuotaStatus.NO_SERVICE;
  }): Cuota {
    if (amount <= 0) throw new Error("El monto de la cuota es invalido");

    const initialStatus = CuotaStatus.PENDING;
    const createdAt = new Date();
    const serie = `CUOTA-${Cuota.generateSerie(secuence)}`;
    return new Cuota(
      EntityId.create(),
      month,
      year,
      amount,
      initialStatus,
      createdAt,
      serie,
    );
  }

  public static fromPersistence(persisted: CuotaPersistence): Cuota {
    return new Cuota(
      EntityId.fromExisting(persisted.uuid),
      persisted.month,
      persisted.year,
      persisted.amount,
      persisted.status,
      persisted.createdAt,
      persisted.serie,
    );
  }

  getYear() {
    return this.year;
  }
  getAmount() {
    return this.amount;
  }
  getMonth() {
    return this.month;
  }
  isDelayed() {
    const today = new Date();
    return today.getMonth() > this.month && today.getFullYear() === this.year;
  }
  isPaid() {
    return this.status === CuotaStatus.PAID;
  }
  delay() {
    if (this.isDelayed()) {
      this.status = CuotaStatus.LATE;
    }
  }
  getStatus() {
    return this.status;
  }
  getCreatedAt() {
    return this.createdAt;
  }
  getSerie() {
    return this.serie;
  }
  setState(status: CuotaStatus) {
    this.status = status;
  }
}

export enum CuotaStatus {
  PENDING = "PENDIENTE",
  PAID = "PAGADA",
  LATE = "ATRASADA",
  NO_SERVICE = "SIN SERVICIO",
}
