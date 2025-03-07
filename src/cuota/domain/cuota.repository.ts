import { Cuota, CuotaStatus } from "./cuota.entity";

export interface CuotaRepository {
  save(cuota: Cuota): Promise<Cuota>;
  update(uuid: string, status: CuotaStatus): Promise<Cuota>;
  findAll(): Promise<Cuota[]>;
}
