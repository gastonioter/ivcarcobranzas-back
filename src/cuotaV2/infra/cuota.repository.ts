import { Cuota } from "../domain/cuota.entity";
import { CuotaFilters, CuotaRepository } from "../domain/cuota.repository";
import { CuotaModel, ICuota } from "./cuota.schema";

export class MongoCuotaRepository implements CuotaRepository {
  async findById(uuid: string): Promise<Cuota | null> {
    const doc = await CuotaModel.findOne({ uuid });
    if (!doc) return null;
    return this.toDomain(doc);
  }

  async findAll(filters: CuotaFilters = {}): Promise<Cuota[]> {
    const query: Record<string, unknown> = {};
    if (filters.customerId) query.customerId = filters.customerId;
    if (filters.uuids)      query.uuid = { $in: filters.uuids };
    if (filters.month)      query.month = filters.month;
    if (filters.year)       query.year = filters.year;
    if (filters.status)     query.status = filters.status;

    const docs = await CuotaModel.find(query);
    return docs.map((doc: ICuota) => this.toDomain(doc));
  }

  async save(uuid: string, data: Cuota): Promise<void> {
    await CuotaModel.findOneAndUpdate(
      { uuid },
      this.toPersistence(data),
      { upsert: true, new: true },
    );
  }

  private toPersistence(cuota: Cuota): ICuota {
    return {
      uuid: cuota.getId(),
      customerId: cuota.customerId,
      month: cuota.month,
      year: cuota.year,
      amount: cuota.amount,
      serie: cuota.serie,
      status: cuota.status,
      createdAt: cuota.createdAt,
    };
  }

  private toDomain(doc: ICuota): Cuota {
    return Cuota.fromPersistence({
      uuid: doc.uuid,
      customerId: doc.customerId,
      month: doc.month,
      year: doc.year,
      amount: doc.amount,
      serie: doc.serie,
      status: doc.status,
      createdAt: doc.createdAt,
    });
  }
}
