import { Entity } from "../../shared/domain/Entity";
import { EntityId } from "../../shared/valueObjects/entityId.vo";
import { CuotaPersistence } from "../infraestrcture/cuota.schema";

export class Cuota extends Entity {
  private year: number;
  private month: number;
  private amount: number;
  private status: CuotaStatus;

  private constructor(
    uuid: EntityId,
    month: number,
    year: number,
    amount: number,
    status: CuotaStatus,
  ) {
    super(uuid);
    this.amount = amount;
    this.month = month;
    this.year = year;
    this.status = status;
  }

  public static new({ amount }: { amount: number }): Cuota {
    if (amount <= 0) throw new Error("El monto de la cuota es invalido");
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    const initialStatus = CuotaStatus.PENDING;
    return new Cuota(EntityId.create(), month, year, amount, initialStatus);
  }

  public static fromPersistence(persisted: CuotaPersistence): Cuota {
    return new Cuota(
      EntityId.fromExisting(persisted.uuid),
      persisted.month,
      persisted.year,
      persisted.amount,
      persisted.status,
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
}

export enum CuotaStatus {
  PENDING = "PENDIENTE",
  PAID = "PAGADA",
  LATE = "ATRASADA",
}
