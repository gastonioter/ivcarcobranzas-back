import { Cuota, CuotaStatus } from "../domain/cuota.entity";
import { CuotaRepository } from "../domain/cuota.repository";
import { CuotaModel } from "./cuota.schema";

export class CuotaMongoRepository implements CuotaRepository {
  async save(cuota: Cuota): Promise<Cuota> {
    const toSave = {
      uuid: cuota.getId(),
      month: cuota.getMonth(),
      year: cuota.getYear(),
      amount: cuota.getAmount(),
      status: cuota.getStatus(),
    };

    const saved = await CuotaModel.create(toSave);
    return Cuota.fromPersistence(saved);
  }

  async update(uuid: string, status: CuotaStatus): Promise<Cuota> {
    throw new Error("Method not implemented.");
  }

  async findAll(): Promise<Cuota[]> {
    throw new Error("Method not implemented.");
  }
}
