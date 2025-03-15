import { Cuota } from "../../cuota/domain/cuota.entity";
import { Entity } from "../../shared/domain/Entity";
import { EntityId } from "../../shared/valueObjects/entityId.vo";

export class Pago extends Entity {
  private cuotas: Cuota[];
  private total: number;
  private serie: string;
  private createdAt: Date;

  constructor(
    uuid: EntityId,
    cuotas: Cuota[],
    total: number,
    serie: string,
    createdAt: Date,
  ) {
    super(uuid);
    this.cuotas = cuotas;
    this.total = total;
    this.serie = serie;
    this.createdAt = createdAt;
  }

  static new(cuotas: Cuota[], secuence: number): Pago {
    if (cuotas.length === 0) {
      throw new Error("El pago debe tener al menos una cuota");
    }

    const uuid = EntityId.create();
    const total = cuotas.reduce((acc, cuota) => acc + cuota.getAmount(), 0);
    const serie = `RECIBO-${secuence + 1000}`.padStart(5, "0");
    const createdAt = new Date();
    return new Pago(uuid, cuotas, total, serie, createdAt);
  }

  static fromPersistence(pago: any): Pago {
    return new Pago(
      EntityId.fromExisting(pago.uuid),
      pago.cuotas.map((cuota: any) => Cuota.fromPersistence(cuota)),
      pago.total,
      pago.serie,
      pago.createdAt,
    );
  }

  getCuotas(): Cuota[] {
    return this.cuotas;
  }
  getSerie(): string {
    return this.serie;
  }
  getTotal(): number {
    return this.total;
  }
  getCreatedAt(): Date {
    return this.createdAt;
  }
}
