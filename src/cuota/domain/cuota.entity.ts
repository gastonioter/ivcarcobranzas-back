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
    facturaId,
  }: {
    amount: number;
    secuence: number;
    year: number;
    month: number;
    status: CuotaStatus.PENDING | CuotaStatus.NO_SERVICE;
    facturaId?: string;
  }): Cuota {
    if (amount <= 0) throw new Error("El monto de la cuota es invalido");

    const createdAt = new Date();
    const serie = facturaId
      ? facturaId
      : `CUOTA-${Cuota.generateSerie(secuence)}`;
    return new Cuota(
      EntityId.create(),
      month,
      year,
      amount,
      status,
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
    if (this.getStatus() === CuotaStatus.PAID) {
      throw new Error("La cuota ya esta paga");
    }

    this.status = status;
  }
  setAmount(amount: number) {
    this.amount = amount;
  }
  setSerie(serie: string) {
    this.serie = serie;
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
