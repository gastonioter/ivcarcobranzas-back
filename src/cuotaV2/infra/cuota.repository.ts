import { Cuota } from "../domain/cuota.entity";
import { CuotaFilters, CuotaRepository } from "../domain/cuota.repository";
import { CuotaDoc, CuotaModel } from "./cuota.schema";

export class MongoCuotaRepository implements CuotaRepository {
  async findById(uuid: string): Promise<Cuota | null> {
    const doc = await CuotaModel.findOne({ uuid });
    if (!doc) return null;
    return this.toDomain(doc);
  }

  async findAll(filters: CuotaFilters = {}): Promise<Cuota[]> {
    const query: Record<string, any> = {};

    // Filtros exactos y básicos
    if (filters.customerId) query.customerId = filters.customerId;
    if (filters.year) query.year = filters.year;
    if (filters.status) query.status = filters.status;
    if (filters.uuids) query.uuid = { $in: filters.uuids };

    // Filtro de rango de meses dinámico
    if (filters.monthStart || filters.monthEnd) {
      const monthQuery: Record<string, number> = {};

      if (filters.monthStart) {
        monthQuery["$gte"] = filters.monthStart; // Mayor o igual a "mes desde"
      }
      if (filters.monthEnd) {
        monthQuery["$lte"] = filters.monthEnd; // Menor o igual a "mes hasta"
      }

      query.month = monthQuery;
    }

    const docs = await CuotaModel.find(query);
    return docs.map((doc: CuotaDoc) => this.toDomain(doc));
  }
  async save(uuid: string, data: Cuota): Promise<void> {
    await CuotaModel.findOneAndUpdate({ uuid }, this.toPersistence(data), {
      upsert: true,
      new: true,
    });
  }

  private toPersistence(cuota: Cuota): CuotaDoc {
    return {
      uuid: cuota.getId(),
      customerId: cuota.customerId,
      sequence: cuota.sequence,
      month: cuota.month,
      year: cuota.year,
      amount: cuota.amount,
      status: cuota.status,
      createdAt: cuota.createdAt,
    };
  }

  private toDomain(doc: CuotaDoc): Cuota {
    return Cuota.fromPersistence({
      uuid: doc.uuid,
      customerId: doc.customerId,
      sequence: doc.sequence,
      month: doc.month,
      year: doc.year,
      amount: doc.amount,
      status: doc.status,
      createdAt: doc.createdAt,
    });
  }
}
